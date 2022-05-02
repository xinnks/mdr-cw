const { fetchDevToArticlesFromAPI } = require("./../content");
const { formatPostsDataSchema } = require("./../content/posts");
const { formatDate, dateDifference } = require("./../content/helpers/utils");
const { deleteDocuments, insertDocuments, fetchAllCollectionData } = require("./../db");
const todayDate = formatDate(new Date(), "dashedDate");
const yesterdayDate = formatDate(dateDifference(new Date(), -1), "dashedDate");

/**
 * @description This function fetches and compiles the latest content from sources, formats to a preffered schema and stores them into the database
**/
export async function CollectContentForDay(contentLimit, previousInsertDate = yesterdayDate){
  let message, formattedDevToContent;
  let {state, body: devToContent} = await fetchDevToArticlesFromAPI(1, contentLimit);
  if(state === "success"){
    formattedDevToContent = await formatPostsDataSchema(devToContent, 0, devToContent.length, 'dev.to');
  } else {
    return {status: "failure", message: "Failed to fetch DevTo API data"}
  }
  
  // collect new day content
  const allContentWithInsertDate = formattedDevToContent.map(post => ({...post, insertDate: todayDate}));
  
  // check if previous day content exists ( check if content stash collection is not empty )
  let {existingContentStashState, body: existingContentStash} = await fetchAllCollectionData(ALL_CONTENT_INDEX);
  console.log("existing documents: --- ", existingContentStash.length);
  if(existingContentStashState === "success" && existingContentStash.length){
    // delete previous day content
    let {state: deletionStatus} = await deleteDocuments(existingContentStash.map(x => x.refId), CONTENT_COLLECTION);
    console.log("deleted documents: --- ", deletionStatus);
    if(deletionStatus === "failure"){
      message = "Could not delete documents";
      // TODO: send error log email
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