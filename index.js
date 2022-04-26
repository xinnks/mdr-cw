import { Router } from 'itty-router';
import { rawHtmlResponse } from './utils';
import { indexHtml } from './fns/html';
// Create a new router
const router = Router();

/**
 * Index route, returns the home-page html.
 * @returns {Response}
*/
router.get("/", () => {
  return rawHtmlResponse(indexHtml);
})

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request));
})
