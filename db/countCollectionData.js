const { Paginate, Match, Index, Select, Count, faunaClient } = require("./client");

/**
 * @description This function fetches all the docs within a collection
 * @param { String } collectionIndex => Collection index name
 * @param { Object } query => Optional query to match the docs to fetch
**/
export async function countCollectionData(collectionIndex, query = null){
  let result = "";
  console.log("Querying: - ", collectionIndex)
  
  result = await faunaClient.query(
    Select(['data', 0], Count(
      Paginate(Match(Index(collectionIndex)))
    ))
  );
  
  return {
    state: "success",
    body: result
  };
}