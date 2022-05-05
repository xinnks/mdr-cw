const { findDocument, insertDocument } = require("./../db");
const { generateOTP } = require("./../content/helpers/utils");
const { sendOtpEmail } = require("./../content/helpers/emails");

/**
 * @description This function verifies the user account from a unsubscription request
 * @param { String } email => The user's data
**/
export function UnsubscriptionRequest(email){
  let message;
  // check if user existss
  const {state: foundDoc, body: user} = await findDocument({email: email}, USER_COLLECTION, {_id: 1, email: 1, name: 1});
    if(foundDoc === "error"){
      message = "No user with this email!";
      return {status: "failure", body: message};
    }
    
    const otp = generateOTP();
    
    const {state: submitionStatus} = await insertDocument({email: userAccount.email, otp: otp, created: new Date()}, OTP_COLLECTION);
    if(!submitionStatus){
      message = "Could not create OTP row!";
      // TODO: Send error log email
      return {status: "failure", body: message};
    }
    
    const emailSent = await sendOtpEmail(user.data.email, otp, user.data.name, "unsubscribe")
    if(!emailSent){
      message = "Could not send OTP email!";
      // TODO: Send error log email
      return {status: "failure", body: message};
    }
    
    message = "Email Sent!";
    return {status: "success", body: message};
}