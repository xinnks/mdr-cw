const { Delete, Ref, Collection, getFaunaError, faunaClient } = require('./client');

/**
 * @description This function deletes one documents
 * @param { String } refId => Document's ref id
 * @param { String } collectionIndex => Collection index
**/
export async function deleteDocuments(refId, collectionIndex){
  try {
    const result = await faunaClient.query(
      Delete(
        Ref(
          Collection(collectionIndex), refId
        )
      )
    );
    
    return {
      state: "success",
      body: result.data
    }
  } catch (error) {
    return {
      state: "error",
      body: getFaunaError(error)
    };
  }
}