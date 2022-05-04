const cheerio = require("cheerio");
const wyt = require("wyt");
const rateLimiter = wyt(5, 1000);

/**
 * @description This function takes a url, scrappes for specific data and returns it
 * @param { String } url => The url of the content
 * @param { String } source => Source where the content is from
 * @param { Object } partialData => Optional partial data already collected
**/
export async function getImportantPageFields (url, source = "dev.to", partialData){
  console.time(url);
  await rateLimiter();
  const response = await fetch(url);
  let $ = cheerio.load(await response.text());

  // get page <head> title inner text; get value of the title in relation to the keywords
  let headMetaOgImage = partialData.headMetaOgImage || $('meta[property="og:image"]').attr('content');

  // get page <head> title inner text; get value of the title in relation to the keywords
  let headTitle = partialData.headTitle || $('head').find('title').text();

  // get page <head> description meta content inner text; get value of the description in relation to the keywords
  let headMetaDescription = partialData.headMetaDescription || $('meta[name="description"]').attr('content');

  // get page <body> <h1> title inner text; get value of the heading in relation to the keywords
  let bodyH1Heading;
  if(source === 'hashnode'){
    // hashnode specific h1 tag
    bodyH1Heading = partialData.bodyH1Heading || $('h1[data-query="post-title"]').text();
  }
  if(source === 'dev.to'){
    // dev.to specific h1 tag
    bodyH1Heading = partialData.bodyH1Heading || $('h1').text();
  }

  // get creator's twitter handler
  let twitterHandle = $('meta[name="twitter:creator"]').attr('content');
  twitterHandle = (twitterHandle !== "" && twitterHandle !== "@") ? twitterHandle : null;

  let articleWithHtml = $('article').text();
  const bodyArticleContent = articleWithHtml
    .replace(/<style[^>]*>[^]*<\/style>/gi, "") // clear styles
    .replace(/<pre[^>]*>[^]*<\/pre>/gi, "") // clear code blocks
    .replace(/<[^>]*>/g, ""); // clear all html tags

  console.timeEnd(url);

  return {
    headMetaOgImage,
    headTitle,
    headMetaDescription,
    bodyH1Heading,
    bodyArticleContent,
    twitterHandle,
    url // for comparison purposes
  };

}

/**
 * @description This function extracts post url from hashnode content api response data
 * @param { Object } data => The hashnode post data
 * @returns { String }
**/
function hashnodePostUrl(data) {
  return (data.author && data.author.publicationDomain) ? `https://${data.author.publicationDomain}/${data.slug}` : `https://${data.author.blogHandle}.hashnode.dev/${data.slug}`;
}
