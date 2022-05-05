const { formatDate } = require('./../content/helpers/utils');
const { analysePostsByKeywords } = require('./../content/posts');
const { sendDailyContentEmails } = require('./../content/helpers/emails');
const { insertDocuments, fetchAllCollectionData } = require("./../db");

/**
 * @description This function fetches the content stored in the database iterates through it rating the content by the provided keywords of each user and sends the 5 top rated articles to the user's inbox
**/
export async function SendContentEmails(){
  let message, allUsersReads = [], emailArray = [];
  let {state, body: userAccounts} = await fetchAllCollectionData(ALL_USERS_INDEX);
  if(state === "failure" || !userAccounts.length){
    message = "Failed to fetch user accounts.";
    return {status: "failure", message};
  }
  
  let {state: collectingState, body: collectedStashedContent} = await fetchAllCollectionData(ALL_CONTENT_INDEX);
  if(collectingState === "failure" || !collectedStashedContent.length){
    message = "Failed to fetch collected content.";
    // TODO: send error log email
    return {status: "failure", message};
  }
  
  await userAccounts.map(x => x.data).forEach(async (user) => {
    let keywordsToArray = user.keywords.includes(",") ? user.keywords.replace(" ", "").split(",") : [user.keywords];
    let analysedPosts = await analysePostsByKeywords(collectedStashedContent.map(x => ({...x.data, refId: x.refId})), keywordsToArray, 0, collectedStashedContent.length, 'dev.to');
    let pickedPosts = analysedPosts.slice(0, 5);
    const userReads = pickedPosts.map(x => ({
      ...x,
      user: {name: user.name, email: user.email},
      read: 0,
      inserDate: formatDate(new Date(), "dashedDate")
    }));
    
    if(!allUsersReads.length){
      allUsersReads = userReads;
    } else {
      allUsersReads = allUsersReads.concat(userReads);
    }
    emailArray.push({
      user: {name: user.name, email:user.email},
      date: formatDate(new Date(), "human"),
      content: pickedPosts.map(x => ({
        url: `${SITE_URL}/rdr?id=${x.contentStashId}`,
        image: x.image,
        title: x.title,
        description: x.description,
        author: x.author
      })),
      keywords: user.keywords
    });
  });
  
  let {state: storeReadsState, body: storeReads} = await insertDocuments(allUsersReads, READS_COLLECTION);
  if(storeReadsState === "failure"){
    message = "Failed to store reads to database.";
    // TODO: send error log email
    return {status: "failure", message};
  }
  
  const sendEmails = await sendDailyContentEmails(emailArray);
  if(!sendEmails){
    message = "Failed to send emails.";
    // TODO: send error log email
    return {status: "failure", message};
  }

  message = "Successfully completed task.";
  return {status: "success", message};
}