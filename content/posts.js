const Bottleneck = require('bottleneck');

/**
 * @description This function takes postdata with a number of properties rates it to the given keywords
 * @param { Object } postData => The string to be rated
 * @param { Array } keywords => keywords to rate the string by
**/
export function getPostValue(postData , keywords) {
  let postValue = 0; // value of the post in relation to the keywords
  
  // get page <head> title inner text; get value of the title in relation to the keywords
  postValue += (analyseKeywords(keywords, postData.headTitle) * 2);

  // get page <head> description meta content inner text; get value of the description in relation to the keywords
  postValue += (analyseKeywords(keywords, postData.headMetaDescription) * 2);

  // get page <body> <h1> title inner text; get value of the heading in relation to the keywords
  postValue += (analyseKeywords(keywords, postData.bodyH1Heading) * 2);
  
  // get keywords value for text in <body> <article> content
  postValue += analyseKeywords(keywords, postData.bodyArticleContent);
  
  return parseFloat(postValue.toFixed(2));
}

/**

/**
 * @description This function rates an array of posts using the provided keywords
 * @param { Array } posts => The array of posts to be rated
 * @param { Array } keywords => The keywords to rate the posts by
 * @param { Number } startingPoint => Posts starting count point
 * @param { Number } totalPosts => The total posts count
 * @param { String } source => Source of the posts content
**/
export async function analysePostsByKeywords(posts, keywords, startingPoint, totalPosts, source = 'hashnode'){
  let postsByValue = [], formatedPost;

  posts.forEach(async post => {
    let postValue = 0; // value of the post in relation to the keywords
    postValue = getPostValue(post, keywords);
  
    // aggregate posts
    postsByValue.push({...post, postValue});
      
    if(startingPoint + 1 >= totalPosts){
      postsByValue.sort((x, y) => {
        console.log(`sorting..`);
        return y.postValue - x.postValue
      })
      formatedPost = postsByValue.map((item) => ({
        url: item.url,
        title: item.title,
        description: item.description,
        datePublished: item.datePublished,
        author: !!item.author ? (item.author.includes(" ") ? formatName(item.author) : item.author) : "Unknown Author",
        image: item.image,
        keywords: keywords.join(),
        articleValue: item.postValue,
        source: item.domain || `https://dev.to`,
        contentStashId: item.refId // _id.toString()
      }));
    }
    startingPoint++;
  });
  return formatedPost;
}
 * @description This function formats posts to our post data schema
 * @param { Array } posts => The array of posts to be formatted
 * @param { Number } startingPoint => Posts starting count point
 * @param { Number } totalPostsCount => The total posts count
 * @param { String } source => Source of the posts content
**/
export async function formatPostsDataSchema(posts, startingCount, totalPostsCount, source = 'hashnode'){
  let formattedPosts = [];
  console.log("POSTS Count: ",totalPostsCount, " | totalPostsCount: ", totalPostsCount, " | posts.length: ", posts.length);
  const limiter = new Bottleneck({
    maxConcurent: 5
  });
  const concurLimitedGetFields = limiter.wrap(getImportantPageFields);
  const fetchAll = posts.map(x => {
    const postUrl = source === "hashnode" ? ((x.author && x.author.publicationDomain) ? `https://${x.author.publicationDomain}/${x.slug}` : `https://${x.author.username}.hashnode.com/${x.slug}`) : x.url;
    const fetchFields = async () => await concurLimitedGetFields(postUrl, source);
    return fetchFields();
  });

  const getAll = Promise.all(fetchAll);
  try {
    console.time("timeUsed");
    const allFetched = await getAll;
    console.timeEnd("timeUsed");
    console.log("FINISHED CHECKING URLs[totalPostsCount]: ", allFetched.length);
    // console.log("HASHNODE URL CHECK");
    let isHashnode = source === "hashnode";
    allFetched.forEach(item => {
      // content
      let postInfo = posts.filter(p => p.url === item.url);
      let postUrl = isHashnode ? ((postInfo[0].author && postInfo[0].author.publicationDomain) ? `https://${postInfo[0].author.publicationDomain}/${postInfo[0].slug}` : `https://${postInfo[0].author.username}.hashnode.com/${postInfo[0].slug}`) : item.url;
      delete item.url;
      console.log(`WORKING ON POST FROM (${source})[${postUrl}]: -- `, item.headTitle, item.twitterHandle);
      let alternativeImage = item.headMetaOgImage;
      formattedPosts.push({
        title: postInfo[0].title,
        domain: isHashnode ? (postInfo[0].author.publicationDomain || `https://${postInfo[0].author.username}.hashnode.com`) : 'https://dev.to',
        description: isHashnode ? postInfo[0].brief : postInfo[0].description,
        url: postUrl,
        image: isHashnode ? (postInfo[0].coverImage || alternativeImage) : (postInfo[0].cover_image || alternativeImage),
        author: isHashnode ? postInfo[0].author.name : postInfo[0].user.name,
        datePublished: isHashnode ? postInfo[0].dateAdded : postInfo[0].published_at,
        ...item,
        source
      });
    });
    return formattedPosts;
  } catch(e) {
    console.log("Error logged: ", e);
  }

}