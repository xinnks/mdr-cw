const { fetchDevToArticlesFromAPI } = require("./../content/devto_content");
const { formatPostsDataSchema } = require("./../content/posts/formatPostsDataSchema");
const { formatDate, dateDifference } = require("./../content/helpers/utils");
const { deleteDocuments, insertDocuments, fetchAllCollectionData, countCollectionData } = require("./../db");
const todayDate = formatDate(new Date(), "dashedDate");
const yesterdayDate = formatDate(dateDifference(new Date(), -1), "dashedDate");
const { fetchHashnodePostsFromAPI } = require('./../content/hashnode_content');

/**
 * @description This function fetches and compiles the latest content from sources, formats to a preffered schema and stores them into the database
**/
export async function CollectContentForDay(contentLimit, previousInsertDate = yesterdayDate){
  let message, formattedDevToContent, formattedHashnodeContent;
  let {state, body: hashnodeContent} = await fetchHashnodePostsFromAPI();
  if(state === "success"){
    formattedHashnodeContent = await formatPostsDataSchema(hashnodeContent, 0, hashnodeContent.length, 'hashnode');
  } else {
    return {status: "failure", message: "Failed to fetch DevTo API data"}
  }
  
  // collect new day content
  const allContentWithInsertDate = formattedHashnodeContent.map(post => ({...post, insertDate: todayDate}));
  
  // check if previous day content exists ( check if content stash collection is not empty )
  let {state: existingContentCountState, body: existingContentCount} = await countCollectionData(ALL_CONTENT_INDEX);
  if(existingContentCountState === "success" && existingContentCount){
    let {state: fetchState, body: existingContentStash} = await fetchAllCollectionData(ALL_CONTENT_INDEX);
    if(fetchState === "success"){
      // delete previous day content
      let {state: deletionStatus} = await deleteDocuments(existingContentStash.map(x => x.refId), CONTENT_COLLECTION);
      if(deletionStatus === "failure"){
        message = "Could not delete documents";
        // TODO: send error log email
      }
    } else {
      message = "Could not fetch docs to delete";
    }
  }
  
  let {state: insertionStatus} = await insertDocuments(allContentWithInsertDate, CONTENT_COLLECTION);
  if(insertionStatus === "failure"){
    message = "Could not submit documents";
    // TODO: send error log email
    return {status: "failure", message};
  }

  message = "Successfully added daily content.";
  return {status: "success", message};
}