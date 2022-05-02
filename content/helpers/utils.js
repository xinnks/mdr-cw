const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * @description This function takes a date string and formats it
 * @param { String } date => date to be formatted
**/
export function formatDate(date = new Date(), format = "human") {
  let theDate = new Date(date);
  let parsedDate;
  if(format === "human"){
    parsedDate = `${months[theDate.getMonth()]} ${theDate.getUTCDate()}, ${theDate.getFullYear()}`;
  }
  if(format === "dashedDate"){
    parsedDate = `${theDate.getUTCDate()}-${theDate.getMonth()+1}-${theDate.getFullYear()}`;
  }
  return parsedDate;
}
