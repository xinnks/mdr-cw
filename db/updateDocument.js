const { Update, Ref, Collection, faunaClient, getFaunaError } = require("./client");

/**
 * @description This function updates a doc inside a collection
 * @param { String } query => The query to match the doc to update
 * @param { Object } updateData => new data
 * @param { String } collection => Collection name
**/
export async function updateDocument(query, updateData, collection) {
  try {
    const result = await faunaClient.query(
      Update(
        Ref(Collection(collection), query),
        {
          data: updateData,
        }
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