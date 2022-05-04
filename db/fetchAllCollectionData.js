const faunadb = require('faunadb');
const { getFaunaError } = require('./db-utils.js');
const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET
})
const { Map, Paginate, Lambda, Let, Var, Select, Get, Match, Index } = faunadb.query;

/**
 * @description This function fetches all the docs within a collection
 * @param { String } collectionIndex => Collection index name
 * @param { Object } query => Optional query to match the docs to fetch
**/
export async function fetchAllCollectionData(collectionIndex, query = null){
  let result = "";
  try {
    result = await faunaClient.query(
      Map(
        Paginate(
          Match(Index(collectionIndex)),
          { size: 1000 }
        ),
        Lambda("itemRef",
          Let({ item: Get(Var("itemRef")) }, {
            refId: Select(['ref', 'id'], Var('item')),
            data: Select(['data'], Var('item'))
          })
        )
      )
    );
    
    return {
      state: "success",
      body: result.data
    };
  } catch (error) {
    return {
      state: "failure",
      body: /* getFaunaError(error) */ error
    };
  }
}