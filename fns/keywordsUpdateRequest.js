const { findDocument, insertDocument } = require("./../db");
const { generateOTP } = require("./../content/helpers/utils");
const { sendOtpEmail } = require("./../content/helpers/emails");

/**
 * @description This function logs user's content keywords update request
 * @param { String } email => The user's email
**/
export async function KeywordsUpdateRequest(email){
  let message;
  // get user info
  const {state: userState, body: userAccount} = await findDocument(email, ALL_USERS_INDEX);

  if(userState === "error"){
    message = "No user with email!";
    return {status: "failure", body: message};
  }
  
  const otp = generateOTP();
  
  // Save otp to db
  const {state: otpInsertState} = await insertDocument({email: userAccount.data.email, otp: otp, created: new Date()}, OTP_COLLECTION);
  if(otpInsertState === "error"){
    message = "Could not create OTP row!";
    // TODO: Send error log email
    return {status: "failure", body: message};
  }
  
  // Send otp email
  const emailSent = await sendOtpEmail(userAccount.data.email, otp, userAccount.data.name)
  if(!emailSent){
    message = "Could not send OTP email!";
    // TODO: Send error log email
    return {status: "failure", body: message};
  }
  
  message = "Email Sent!";
  return {status: "success", body: message};
}