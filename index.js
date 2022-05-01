import { Router } from 'itty-router';
import { rawHtmlResponse } from './utils';
import { indexHtml } from './fns/html';
import { Subscribe } from './fns';
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
addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request));
})
