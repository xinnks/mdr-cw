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

/**
 * @description This function formats posts to our post data schema
 * @param { Array } posts => The array of posts to be formatted
 * @param { Number } startingPoint => Posts starting count point
 * @param { Number } totalPostsCount => The total posts count
 * @param { String } source => Source of the posts content
**/
export async function formatPostsDataSchema(posts, startingCount, totalPostsCount, source = 'hashnode'){
    let formattedPosts = [];
    console.log("POSTS Count: ",totalPostsCount, " | totalPostsCount: ", totalPostsCount, " | posts.length: ", posts.length);
    const fetchAll = posts.filter(item => item.author && (item.author.publicationDomain || item.author.blogHandle )).map(post => {
      const postUrl = source === "hashnode" ? hashnodePostUrl(post) : post.url;
      const partialData = source === "hashnode" ? {headMetaDescription: post.brief, headMetaOgImage: post.coverImage, headTitle: post.title} : null;
      return getImportantPageFields(postUrl, source, partialData);
    });
    
    console.time("timeUsed");
    const allFetched = await Promise.all(fetchAll);
    console.timeEnd("timeUsed");
    console.log("FINISHED CHECKING URLs[totalPostsCount]: ", allFetched.length);
    console.log("Here 5");
    let isHashnode = source === "hashnode", count = 0;
    allFetched.forEach(item => {
      count++;
      console.log("Inside allFetched.forEach");
      // content
      let postInfo = isHashnode ?
        posts.filter(info => hashnodePostUrl(info) === item.url) :
        posts.filter(info => info.url === item.url);
      let postUrl = isHashnode ? hashnodePostUrl(postInfo[0]) : item.url;
      delete item.url;
      console.log(`WORKING ON POST FROM (${source})[${postUrl}]: -- `, item.headTitle, item.twitterHandle);
      let alternativeImage = item.headMetaOgImage;
      formattedPosts.push({
        title: postInfo[0].title,
        domain: isHashnode ? (postInfo[0].author.publicationDomain || `https://${postInfo[0].author.blogHandle}.hashnode.dev`) : 'https://dev.to',
        description: isHashnode ? postInfo[0].brief : postInfo[0].description,
        url: postUrl,
        image: isHashnode ? (postInfo[0].coverImage || alternativeImage) : (postInfo[0].cover_image || alternativeImage),
        author: isHashnode ? postInfo[0].author.name : postInfo[0].user.name,
        datePublished: isHashnode ? postInfo[0].dateAdded : postInfo[0].published_at,
        ...item,
        source
      });
      if(allFetched.length === count){
        console.log("Finished allFetched.forEach");
      }
    });
    return formattedPosts;
  }