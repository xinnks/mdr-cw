const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET
})
const { Map, Lambda, Create, Collection, Var } = faunadb.query;

/**
 * @description This function inserts multiple documents into a collection
 * @param { Array } docs => The documents to be inserted into collection
 * @param { String } collection => Collection name
**/
export async function insertDocuments(docs, collection){
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
}