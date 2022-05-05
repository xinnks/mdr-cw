const { analysePostsByKeywords } = require("./posts")

const GET_FEATURED_ARTICLES = `
  query {
    page0: storiesFeed(type: FEATURED, page: 0){
      title
      slug
      brief
      coverImage
      author{
        name
        publicationDomain
        username
        blogHandle
      }
      dateAdded
      replyCount
      responseCount
      popularity
    }
    page1: storiesFeed(type: FEATURED, page: 1){
      title
      slug
      brief
      coverImage
      author{
        name
        publicationDomain
        username
        blogHandle
      }
      dateAdded
      replyCount
      responseCount
      popularity
    }
  }
`;
const HEADERS = {
  'Content-Type': 'application/json',
};

// fetch articles
export async function fetchHashnodePostsFromAPI(variables={}, query = GET_FEATURED_ARTICLES) {
  const response = await fetch(`https://api.hashnode.com/`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      variables,
      query
    })
  })
  const {data: { page0, page1}} = await response.json()
  return {state: "success", body: page0.concat(page1)};
}
