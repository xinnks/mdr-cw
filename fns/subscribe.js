const { insertDocument, findDocument } = require("./../db");
const { sendWelcomeEmail } = require("./../content/helpers/emails");

/**
 * @description This function subscribes a user to my daily reads
 * @param { Object } userData => The user's data
**/
export async function Subscribe(userData) {
  let message;
  const { state, body } = await findDocument(userData.email, ACCOUNT_FROM_EMAIL_INDEX);
  if(state === "success" && body.data.email === userData.email){
    message = "Email already subscribed!";
    return {status: "failure", message};
  } else {
    const savedUserData = await insertDocument(userData, USER_COLLECTION);
    message = "Successfully subscribed!";
    if(savedUserData.state === "error"){
      message = 'Failed to subscribe! '+JSON.stringify(savedUserData.body);
      // TODO: Send error log email
      return {status: "failure", message};
    }
    
    const welcomeUser = await sendWelcomeEmail(userData);
    if(!welcomeUser){
      message = 'Failed to send welcome email!';
      // TODO: Send error log email
    }
    
    return {status: "success", message};
  }
}