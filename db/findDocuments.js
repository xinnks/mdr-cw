const { Map, Paginate, Lambda, Let, Select, Var, Get, Match, Index, faunaClient, getFaunaError } = require("./client");

/**
 * @description This function filters the docs within a collection using the given query and returns an array of results
 * @param { Object } query => The query to match the document to find
 * @param { String } index => Collection index name
 * @param { Object } dataToReturn => Object projecting the data fields to be returned
**/
export async function findDocuments(query, collectionIndex, dataToReturn){
  try {
    const result = await faunaClient.query(
      Select(["data"],
        Map(
          Paginate(Match(Index(collectionIndex), query)),
          Lambda("docRef", 
            Let({ item: Get(Var("docRef")) }, {
              refId: Select(['ref', 'id'], Var('item')),
              data: Select(['data'], Var('item'))
            })
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