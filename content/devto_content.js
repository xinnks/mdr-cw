const axios = require("axios");

/**
 * @description This function fetches content from dev.to API
 * @param { Number } page => page count
 * @param { Number } date => post items per page
**/
export async function fetchDevToArticlesFromAPI(page = 1, perPage = 20){
  try {
    const { data } = await axios.get(`https://dev.to/api/articles/latest?page=${page}&per_page=${perPage}`)
    console.log("response: -- ", data.length)
    return {state: "success", body: data};
  } catch(error) {
    console.log("error stack: -- ", error)
    return {state: "failure", body: error};
  }
}
