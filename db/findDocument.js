const { Get, Match, Index, faunaClient, getFaunaError } = require("./client");

/**
 * @description This function filters the docs within a collection using the given query
 * @param { Object } query => The query to match the document to find
 * @param { String } index => Collection index name
 * @param { Object } dataToReturn => Object projecting the data fields to be returned
**/
export async function findDocument(query, collectionIndex, dataToReturn){
  try {
    const result = await faunaClient.query(
      Get(
        Match(
          Index(collectionIndex), query
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