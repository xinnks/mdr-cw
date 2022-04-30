const {Map, Lambda, Create, Collection, Var, faunaClient, getFaunaError} = require("./client");

/**
 * @description This function inserts docs into a collection
 * @param { Array } docs => The docs to be inserted to collection
 * @param { String } collection => Collection name
**/
export async function insertDocuments(docs, collection){
  try {
    let result = "";
    if(docs.length > 1){
      result = await faunaClient.query(
        Map(
          docs,
          Lambda("doc",
            Create(
              Collection(collection),
              {
                data: Var("doc")
              }
            )))
      );
    } else {
      result = await faunaClient.query(
        Create(
          Collection('links'),
          {
            data: docs
          }
        )
      );
    }
    
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