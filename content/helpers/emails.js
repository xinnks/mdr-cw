const { formatDate } = require('./utils');

const { otpEmailHtml, ContentEmailHtml, WelcomeEmailHtml, FarewellEmailHtml, KeywordsUpdateEmailHtml } = require('./../../html');

/**
 * @type {Message}
 */
const FROM = {
  Email: MDR_FROM_EMAIL,
  Name: "My Daily Reads"
};

const HEADERS = {
  Authorization:
    'Basic ' + btoa(`${MAILJET_API_KEY}:${MAILJET_API_SECRET}`),
  'Content-Type': 'application/json',
};

/**
 * @description This function sends an OTP password to the provided email account
 * @param { String } email => Receiver's email
 * @param { Number } otp => The one time password to be sent
 * @param { String } name => The name of the receiver of the email
 * @param { String } type => Type of OTP email to be sent
**/
export async function sendOtpEmail(email, otp, name, type = "verification"){
  let emailMessage, customMessage = "";
  if(type === "verification"){
    emailMessage = `Verify your My Daily Reads account \n ${otp} \n Please use this OTP to verify your account and update your daily content keywords. \n This OTP expires after 15 minutes. \n `;
    customMessage = "Please use this OTP to verify your account and update your daily content keywords.";
  }
  if(type === "unsubscribe"){
    emailMessage = `Verify your My Daily Reads account. \n We have received a request to unsubscribe you from the My Daiy Reads service, please use this OTP to proceed. \n ${otp} \n \n This OTP expires after 15 minutes. \n `;
    customMessage = "We have received a request to unsubscribe you from My Daiy Reads service, please use this OTP to proceed.";
  }
  const data = {
    Messages:[
      {
        From: FROM,
        To: [
          {
            Email: email,
            Name: name
          }
        ],
        Subject: "Verify your My Daily Reads account",
        TextPart: emailMessage,
        HTMLPart: otpEmailHtml(otp, email, customMessage)
      }
    ]
  };

  try {
    await fetch(`https://api.mailjet.com/v3.1/send`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data),
    });
    return true;
  }
  catch(e) {
    console.log(e);
    return false;
  }
}
  
/**
 * @description This function mails content emails to users
 * @param { Array } data => The array of emails to be sent
**/
export async function sendDailyContentEmails(data){
  let dateToday = formatDate(new Date(), "human");
  let formattedData = data.map( x => {
    const textPart = x.content.map(x => `${x.title} \n ${x.url} \n ${x.description} \n by ${x.author} \n\n`);
    return {
      To: [
        {
          Email: x.user.email,
          Name: x.user.name
        }
      ],
      TextPart: `Here are some interesting reads we've compiled for you for ${x.date} \n\n ${textPart}`,
      HTMLPart: ContentEmailHtml(x.content, x.keywords, x.user)
    };
  });
  let emailHeading = `Here are some interesting reads we've compiled for you for ${dateToday}.`;
  let stringifiedEmailBody = JSON.stringify({Globals: { FROM: FROM, Subject: emailHeading }, Messages: formattedData});
  
  return fetch(`https://api.mailjet.com/v3.1/send`, {
    method: 'POST',
    headers: HEADERS,
    body: stringifiedEmailBody
  })
  .then(x => {
    return true;
  })
  .catch( e => {
    return false;
  })
}

/**
 * @description This function sends a welcome email
 * @param { Object } user => user object
**/
export async function sendWelcomeEmail(user){
  let firstName = user.name.match(/^([\w]+)/gi)[0];
  let keywords = user.keywords.includes(",") ? user.keywords.replace(" ", "").split(",") : [user.keywords];
  let keywordsText = keywords.length > 1 ? (keywords.length > 1 ? `${keywords[0]} and ${keywords[1]}` : keywords[0]) : "the keywords you provided";
  const data = {
    Messages:[
      {
        From: FROM,
        To: [
          {
            Email: user.email,
            Name: user.name
          }
        ],
        Subject: "Congrats for subscribing to My Daily Reads",
        TextPart: `Hello ${user.name.match(/^([\w]+)/gi)[0]}, you've successfully subscribed to My Daily Reads. \n We'll be sending you daily dev content tailored to ${keywordsText}.`,
        HTMLPart: WelcomeEmailHtml(firstName, keywordsText, user.email)
      }
    ]
  };

  return fetch(`https://api.mailjet.com/v3.1/send`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  })
  .then(x => {
    return true;
  })
  .catch( e => {
    return false;
  })
}
  
/**
 * @description This function sends a farewell email
 * @param { Object } user => user object
**/
export async function sendFarewellEmail(user){
  let firstName = user.name.match(/^([\w]+)/gi)[0];
  const data = {
    Messages:[
      {
        From: FROM,
        To: [
          {
            Email: user.email,
            Name: user.name
          }
        ],
        Subject: "Tchao! " + firstName,
        TextPart: `Hello ${firstName}, you've successfully unsubscribed from My Daily Reads. \n Sad to see you go.`,
        HTMLPart: FarewellEmailHtml(firstName)
      }
    ]
  };

  try {
    await fetch(`https://api.mailjet.com/v3.1/send`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data),
    });
    return true;
  }
  catch(e) {
    console.log(e);
    return false;
  }
}

/**
 * @description This function sends a keywords update notification email to user
 * @param { Object } user => User information object
**/
export async function updateNotificationEmail(user){
  let firstName = user.name.match(/^([\w]+)/gi)[0];
  let keywords = user.keywords.includes(",") ? user.keywords.replace(" ", "").split(",") : [user.keywords];
  let keywordsText = keywords.length > 1 ? (keywords.length > 1 ? `${keywords[0]} and ${keywords[1]}` : keywords[0]) : "the new keywords";
  const data = {
    Messages:[
      {
        From: FROM,
        To: [
          {
            Email: user.email,
            Name: user.name
          }
        ],
        Subject: "My Daily Reads content keywords updated.",
        TextPart: `Hello ${firstName}, you've successfully updated the keywords to your My Daily Reads content. \n We'll now be sending you daily dev content tailored to ${keywordsText}.`,
        HTMLPart: KeywordsUpdateEmailHtml(firstName, keywordsText, user.email)
      }
    ]
  };

  return fetch(`https://api.mailjet.com/v3.1/send`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  })
  .then(() => {
    return true;
  })
  .catch(() => {
    return false;
  })
}
