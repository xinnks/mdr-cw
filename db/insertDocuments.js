const {Map, Lambda, Create, Collection, Var, faunaClient, getFaunaError} = require("./client");

/**
 * @description This function inserts multiple documents into a collection
 * @param { Array } docs => The documents to be inserted into collection
 * @param { String } collection => Collection name
**/
export async function insertDocuments(docs, collection){
  try {
    const result = await faunaClient.query(
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