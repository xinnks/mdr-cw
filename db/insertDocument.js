const { Create, Collection, faunaClient, getFaunaError} = require("./client");

/**
 * @description This function inserts one document into a collection
 * @param { Array } doc => The document to be inserted into collection
 * @param { String } collection => Collection name
**/
export async function insertDocument(doc, collection){
  try {
    const result = await faunaClient.query(
      Create(
        Collection(collection),
        {
          data: doc
        }
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