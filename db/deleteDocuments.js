const faunadb = require('faunadb');
const { getFaunaError } = require('./db-utils.js');
const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET
})
const { Map, Lambda, Delete, Ref, Collection, Var } = faunadb.query;

/**
 * @description This function deletes many documents
 * @param { Array } refId => An Array of documents' ref ids
 * @param { String } collectionIndex => Collection index
**/
export async function deleteDocuments(refIds, collectionIndex){
  const result = await faunaClient.query(
    Map(
      refIds,
      Lambda("refId",
        Delete(
          Ref(
            Collection(collectionIndex), Var("refId")
          )
        )
      )
    )
  );
  
  return {
    state: "success",
    body: result.data
  }
}