const { formatDate } = require('./utils');

const { ContentEmailHtml, WelcomeEmailHtml } = require('./../../html');

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
