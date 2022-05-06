const { Router } = require('itty-router');
const { rawHtmlResponse, rawJsonResponse, readRequestBody } = require('./utils');
const { Subscribe } = require('./fns/subscribe');
const { CollectContentForDay } = require('./fns/collectContentForDay');
const { SendContentEmails } = require('./fns/sendContentEmails');
const { RedirectToArticle } = require('./fns/redirectToArticle');
const { UnsubscriptionRequest } = require('./fns/unsubscriptionRequest');
const { Unsubscribe } = require('./fns/unsubscribe');
const { KeywordsUpdateRequest } = require('./fns/keywordsUpdateRequest');
const { UpdateKeywords } = require('./fns/updateKeywords');
const { formatDate, dateDifference } = require('./content/helpers/utils');
const { indexHtml, messageHtml, successHtml, NotFoundHtml, UnsubscribeRequestHtml, UpdateKeywordsRequestHtml, KeywordsUpdateHtml } = require('./html');
// Create a new router
const router = Router();

/**
 * Index route, returns the home-page html.
 * @returns {Response}
*/
router.get("/", () => {
  return rawHtmlResponse(indexHtml);
})

/** This route subscribes a user to the my-daily-reads service
 * @param {Request} {params}
 * @returns {Response}
*/
router.post("/subscribe", async request => {
  let response = {}, email = "", name = "", keywords = "";
  let reqBody = await readRequestBody(request);
  
  ({name, email, keywords} = reqBody);

  if (!name || !email || !keywords) {
    return rawHtmlResponse(messageHtml("Missing fields", `${!name?'name, ':''}${!email?'email, ':''}${!keywords?'keywords, ':''} are required.`))
  }

  // filter keywords  
  let filteredKeywords = keywords.match(/^([\w]+[ ]*[,]*[ ]*[\w]+)/gi);
  let screenedKeywordsData = filteredKeywords.length ? filteredKeywords.join(",") : filteredKeywords.join("");
  
  let {status, message} = await Subscribe({name, email, keywords: screenedKeywordsData});
  console.error("{status, message}: -- ", {status, message});
  return status === "success" ? rawHtmlResponse(successHtml) : rawHtmlResponse(messageHtml("Failed to subscribe", message));
})

/**
 * Route that receives an unsubscription request
 * @returns {Response}
*/
router.get("/unsubscribe", async ({ query }) => {
  let message, title, { email } = query;

  if (!email) {
    return rawHtmlResponse(NotFoundHtml);
  }

  const {status, body} = await UnsubscriptionRequest(email);

  if(status === "failure"){
    if(body === "No user with this email!"){
      message = body;
      title = "Unknown Account";
    } else {
      message = "Server Error";
      title = "Sorry, we've encountered an error on our side. Please refresh page to retry.";
    }
    return rawHtmlResponse(messageHtml(title, message));
  }
  return rawHtmlResponse(UnsubscribeRequestHtml);
})

/** This route unsubscribes a user from my-daily-reads service
 * @param {Request} {params}
 * @returns {Response}
*/
router.post("/unsubscribe", async request => {
  let reqBody = await readRequestBody(request), message, title;
  let { otp } = reqBody;
  
  if(!otp){
    message = `otp is required.`;
    return rawHtmlResponse(messageHtml("Missing fields", message));
  }

  const {status, body} = await Unsubscribe(parseInt(otp));

  if(status === "failure"){
    if(body.includes("Could not")){
      message = "Server Error";
      title = "Sorry, we've encountered an error on our side. Please refresh page to retry.";
    } else {
      title = body;
      message = body.toLowerCase().includes("otp") ? "Please make a new unsubscription request." : body;
    }
    return rawHtmlResponse(messageHtml(title, message));
  }
  
  return rawHtmlResponse(messageHtml("Farewell", body));
})

/**
 * Route that receives an update page request
 * @returns {Response}
*/
router.get("/update", async ({ query }) => {
  return rawHtmlResponse(UpdateKeywordsRequestHtml());
})

/** This route logs user info(keywords) update request
 * @param {Request} {params}
 * @returns {Response}
*/
router.post("/update", async request => {
  let reqBody = await readRequestBody(request), message;
  let { email } = reqBody;
  
  if(!email){
    message = `email is required.`;
    return rawHtmlResponse(messageHtml("Missing fields", message));
  }

  const {status, body} = await KeywordsUpdateRequest(email);

  if(status === "failure"){
    return rawHtmlResponse(UpdateKeywordsRequestHtml(body));
  }
  
  return rawHtmlResponse(KeywordsUpdateHtml);
})

/** This route verifies user and updates their content keywords
 * @param {Request} {request}
 * @returns {Response}
*/
router.post("/update-keywords", async request => {
  let reqBody = await readRequestBody(request), message;
  let { otp, keywords } = reqBody;
  
  if(!email || !keywords){
    message = `${!otp?'otp, ':''}${!keywords?'keywords, ':''} are required.`;
    return rawHtmlResponse(messageHtml("Missing fields", message));
  }

  // filter keywords
  let filteredKeywords = keywords.match(/^([.]*[\w]+[ ]*[,]*[ ]*[.]*[\w]+)/gi);
  let escapedKeywordsData = filteredKeywords.length ? filteredKeywords.join(",") : filteredKeywords.join("");

  const {status, body} = await UpdateKeywords(parseInt(otp), escapedKeywordsData);

  if(status === "failure"){
    if(body.includes("Could not")){
      message = "Server Error";
      title = "Sorry, we've encountered an error on our side. Please refresh page to retry.";
    } else {
      title = body;
      message = body.toLowerCase().includes("otp") ? "Please make a new keywords update request." : body;
    }
    return rawHtmlResponse(messageHtml(title, message));
  }
  
  return rawHtmlResponse(messageHtml("Successfully changed keywords!", message));
})

/** This route subscribes a user to the my-daily-reads service
 * @param {Request} {params}
 * @returns {Response}
*/
router.post("/collect-content", async request => {
  let lastDate = null;
  let reqBody = await readRequestBody(request);
  let { secret, count } = reqBody;
  count = count || 100;
  
  if(!secret || (secret && (secret !== CRON_REQUEST_SECRET))){
    return rawJsonResponse("Unauthorized request");
  }
  
  const yesterdayDate = formatDate(dateDifference(new Date(), -1), "dashedDate");

  let {status, message} = await CollectContentForDay(count, lastDate || yesterdayDate);
  
  return rawJsonResponse({status, message});
})

/** This route triggers the sending of daily user content via emails
 * @param {Request} {params}
 * @returns {Response}
*/
router.post("/send-emails", async request => {
  let secret = "";
  let reqBody = await readRequestBody(request);
  ({ secret } = reqBody);
  
  if(!secret || (secret && (secret !== CRON_REQUEST_SECRET))){
    return rawJsonResponse("Unauthorized request");
  }
  
  let {status, message} = await SendContentEmails();
  
  return rawJsonResponse({status, message});
})

/**
 * Redirection route, redirects mdr link to actual post link 
 * @returns {Response}
*/
router.get("/rdr", async ({ query }) => { 
  let {id: contentStashId} = query;

  if (!contentStashId) {
    return rawHtmlResponse(NotFoundHtml);
  }

  const {status, body: url} = await RedirectToArticle(contentStashId);

  if(status === "failure"){
    // Return the HTML with the string to the client
    return rawHtmlResponse(NotFoundHtml);
  }
  // Redirect to url
  return Response.redirect(url, 301)
})

/**
 * This route will match anything that hasn't hit a route defined
above returning a 404 response
 * @returns {Response}
*/
router.all("*", () => new Response("404, not found!", { status: 404 }))

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})
