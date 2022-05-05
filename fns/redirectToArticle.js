const { findDocument, updateDocument } = require("./../db");

/**
 * @description This function gets content's contentStashId and returns article link
 * @param { String } contentStashId => article id
**/
export async function RedirectToArticle(contentStashId){
  let message;
  const { state, body: contentData } = await findDocument(contentStashId, USER_READS_INDEX);

  if(state === "error"){
    message = "Article not found!";
    return {status: "failure", body: message};
  }
  
  // mark content as read
  const {state: updateStatus } = await updateDocument(contentData.refId, {read: 1}, READS_COLLECTION);
  if(updateStatus === "error"){
    message = "Could not update read status!";
    // TODO: Send error log email
  }
  
  return {status: "success", body: contentData.data.url};
}