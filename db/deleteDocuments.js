const faunadb = require('faunadb');
const { getFaunaError } = require('./db-utils.js');
const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET
})
const { Collection, Map, Ref, Lambda, Delete, Select, Var } = faunadb.query;

/**
 * @description This function deletes many documents
 * @param { Array } refId => An Array of documents' ref ids
 * @param { String } collectionName => Collection name
**/
export async function deleteDocuments(refIds, collectionName){
  try {
    const result = await faunaClient.query(
      Map(
        refIds,
        Lambda("refId",
          Delete(
            Ref(
              Collection(collectionName), Var("refId")
            )
          )
        )
      )
    );
    
    return {
      state: "success",
      body: result
    }
  } catch (error) {
    return {
      state: "error",
      body: getFaunaError(error)
    };
  }
}