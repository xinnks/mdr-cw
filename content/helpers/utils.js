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

/**
 * @description This function takes a date and a difference in number and returns a new date
 * @param { Number } date => Original date
 * @param { Number } date => The difference to be operated on the date, defaults to -1
**/
export function dateDifference(date = new Date(), difference = -1) {
  return date.setDate(date.getUTCDate() + difference)
}

/**
 * @description This function takes mixed cased name and formats it
 * @param { String } name => name to be formatted
**/
export function formatName(name) {
  return name.match(/(\w)+/g).map(x => x.slice(0,1).toUpperCase()+''+x.slice(1,x.length).toLowerCase()).join(" ")
}

/**
 * @description This function generates a six figure random number
**/
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000);