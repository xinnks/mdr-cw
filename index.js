import { Router } from 'itty-router';
import { indexHtml } from './fns/html';
import { Subscribe } from './fns';
import { rawHtmlResponse, rawJsonResponse, readRequestBody } from './utils';
import { Subscribe, CollectContentForDay} from './fns';
import { formatDate, dateDifference } from './content/helpers/utils';
import { indexHtml, messageHtml, successHtml } from './html';
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

/** This route subscribes a user to the my-daily-reads service
 * @param {Request} {params}
 * @returns {Response}
*/
router.post("/collect-content", async request => {
  let message = "", statusCode = 200, secret = "", count = 100, lastDate = null;
  let reqBody = await readRequestBody(request);
  ({ secret, count } = reqBody);
  console.log("secret -- ", secret);
  
  if(!secret || (secret && (secret !== CRON_REQUEST_SECRET))){
    return rawJsonResponse("Unauthorized request");
  }
  
  console.log("yesterdayDate: -- ", yesterdayDate);
  const yesterdayDate = formatDate(dateDifference(new Date(), -1), "dashedDate");

  let collectContent = await CollectContentForDay(count, lastDate || yesterdayDate);
  
  if(collectContent.message === "Could not delete documents"){
    console.log("HERE 1: ", collectContent.message);
    message = {message: collectContent.message};
    statusCode = 500;
  }
  if(collectContent.message === "Could not submit documents"){
    console.log("HERE 2: ", collectContent.message);
    message = {message: collectContent.message};
    statusCode = 500;
  }
  if(collectContent.message === "Successfully added daily content."){
    console.log("HERE 3: ", collectContent.message);
    message = {message: collectContent.message};
    statusCode = 200;
  }
  
  return rawJsonResponse(message);
})
addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request));
})
