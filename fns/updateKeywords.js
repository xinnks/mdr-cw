const { findDocument, updateDocument, deleteDocument } = require("./../db");
const { updateNotificationEmail } = require("./../content/helpers/emails");

/**
 * @description This function updates the keywords on the users collection after validating the OTP provided
 * @param { Number } otp => The one time password
 * @param { String } newKeywords => New keywords string
**/
export async function UpdateKeywords(otp, newKeywords){
  let message;
  const {status: otpStatus, body: otpData} = await findDocument(otp, OTP_FROM_OTP_INDEX);
  if(otpStatus === "error" || !otpData.data){
    message = "OTP does not exist!";
    return {status: "failure", body: message};
  }

  if((Date.parse(Date.now()) - Date.parse(new Date(otpData.data.created))) > 900000){
    message = "OTP expired!";
    return {status: "failure", body: message};
  }

  const { state: otpDeletionState } = await deleteDocument(otpData.refId, OTP_COLLECTION);
  if(otpDeletionState === "error"){
    message = "Could not delete OTP row!";
    // TODO: Send error log email
  }
  
  const {status: userFindState, body: userAccount} = await findDocument(otpData.data.email, ACCOUNT_FROM_EMAIL_INDEX);
  if(userFindState === "error"){
    message = "No account with this email!";
    return {status: "failure", body: message};
  }
  
  const  {state: updateState} = await updateDocument(userAccount.refId, {keywords: newKeywords}, USER_COLLECTION)
  if(updateState === "error"){
    message = "Could not update keywords!";
    // TODO: Send error log email
    return {status: "failure", body: message};
  }
  
  // send update notification email
  const notifyUser = await updateNotificationEmail(userAccount.data);
  if(!notifyUser){
    message = "Could not notify user of changes!";
    // TODO: Send error log email 
  }
  
  message = "Successfully updated keywords!";
  return {status: "success", body: message};
}