const { Map, Lambda, Delete, Ref, Collection, Var, getFaunaError, faunaClient } = require('./client')

/**
 * @description This function deletes many documents
 * @param { Array } refId => An Array of documents' ref ids
 * @param { String } collectionIndex => Collection index
**/
export async function deleteDocuments(refIds, collectionIndex){
  try {
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
  } catch (error) {
    return {
      state: "error",
      body: getFaunaError(error)
    };
  }
}