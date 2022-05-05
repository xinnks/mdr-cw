const { sendFarewellEmail } = require("./../content/helpers/emails");
const { findDocument, deleteDocument, deleteDocuments, fetchAllCollectionData } = require("./../db");

/**
 * @description This function unsubscribes a user from the service
 * @param { Number } otpData => The one time password
**/
export async function Unsubscribe (otp){
  let message;
  // get otp info
  const {state: otpStatus, body: otpData} = await findDocument(otp, OTP_FROM_OTP_INDEX);

  if(otpStatus === "error"){
    message = "Unknown otp!";
    return {status: "failure", body: message};
  }
  // check otp expiration status
  if((Date.parse(new Date()) - Date.parse(new Date(otpData.data.created))) > 900000){
    message = "OTP expired!";
    return {status: "failure", body: message};
  }

  // delete otp from db
  const {status: otpDeletionStatus} = await deleteDocument(otpData.refId, OTP_COLLECTION);
  if(otpDeletionStatus === "error"){
    message = "Could not delete OTP row!";
    // TODO: Send error log email 
    return {status: "failure", body: message};
  }
  
  // get user info
  const {state: userStatus, body: userAccount} = await findDocument(otpData.data.email, ACCOUNT_FROM_EMAIL_INDEX);
  if(userStatus === "error"){
    message = "No account with this email!";
    return {status: "failure", body: message};
  }
  
  // delete user from db
  const {status: userDeletionStatus} = await deleteDocument(userAccount.refId, USER_COLLECTION);
  if(userDeletionStatus === "error"){
    message = "Could not delete user!";
    // TODO: Send error log email 
    return {status: "failure", body: message};
  }
  
  // fetch user's reads
  const {state: userReadsState, body: userReads} = fetchAllCollectionData(READS_COLLECTION);
  if(userReadsState === "success" && userReads.length){
    const {state: userReadsDeletionState} = await deleteDocuments(userReads.map(x => x.refId), READS_COLLECTION);
    if(userReadsDeletionState === "error"){
      message = "Could not delete user's reads!";
      // TODO: Send error log email 
      return {status: "failure", body: message};
    }
  }
  
  // send farewell email
  const farewell = await sendFarewellEmail(userAccount.data);
  if(!farewell){
    message = "Could not send farewell email!";
    // TODO: Send error log email 
  }
  
  // respond accordingly
  message = "Successfully unsubscribed!";
  return {status: "success", body: message};
}