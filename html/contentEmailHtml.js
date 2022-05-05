// const txtOnImage = (text, text1, text2) => `https://res.cloudinary.com/djx5h4cjt/image/upload/c_scale,h_200,r_10/l_text:merriweather_20_bold_center:${encodeURIComponent(text)},g_north,y_50,co_darkblue,w_300,c_fit,r_20/l_text:merriweather_20_medium_center:${encodeURIComponent(text1)},g_north,y_90,co_darkblue,w_280,c_fit,r_20/l_text:merriweather_16_mediumitalic_center:${encodeURIComponent(text2)},g_north,y_130,co_darkblue,w_280,c_fit,r_20/my-daily-reads/my-daily-reads-cover-bg.png`;

const ContentEmailHtml = (content, keywords, user) => {

  const limitString = (text, limit) => text.length > limit ? text.slice(0, limit - 2) + '..' : text;

  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let today = new Date();
  let parsedDate = `${months[today.getMonth()]} ${today.getUTCDate()}, ${today.getFullYear()}`;
  // let heroImageText = txtOnImage(`Your daily dose of dev content.`, parsedDate, `[keyword1; keyword2]`);

  return `
  <html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
  <meta name="format-detection" content="telephone=no" />
  
  <!-- MESSAGE SUBJECT -->
	<title>Some interesting reads for ${parsedDate}.</title>

  <style>
    /* Reset styles */
    body {
      margin: 0;
      padding: 0;
      min-width: 100%;
      width: 100% !important;
      height: 100% !important;
    }

    body,
    table,
    td,
    div,
    p,
    a {
      -webkit-font-smoothing: antialiased;
      text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      line-height: 100%;
    }

    table,
    td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse !important;
      border-spacing: 0;
    }

    img {
      border: 0;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }

    /* Extra floater space for advanced mail clients only */
    @media all and (max-width: 600px) {
      .floater {
        width: 320px;
      }
    }

    /* Set color for auto links (addresses, dates, etc.) */
    a,
    a:hover {
      color: #374151;
    }

    .footer a,
    .footer a:hover {
      color: #999999;
    }
  </style>

  <!-- MESSAGE SUBJECT -->
  <title>Get this responsive email template</title>

</head>

<!-- BODY -->
<!-- Set message background color (twice) and text color (twice) -->

<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
	background-color: #FFFFFF;
	color: #000000;" bgcolor="#FFFFFF" text="#000000">

  <!-- SECTION / BACKGROUND -->
  <!-- Set section background color -->
  <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0"
    style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background">
    <tr>
      <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
        bgcolor="#374151">

        <!-- WRAPPER -->
        <!-- Set wrapper width (twice) -->
        <table border="0" cellpadding="0" cellspacing="0" align="center" width="600" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 600px;" class="wrapper">

          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 20px;">

              <!-- PREHEADER -->
              <!-- Set text color to background color -->
              <div style="display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0;
			color: #FFFFFF;" class="preheader">
      Here are some interesting reads we've compiled for you for ${parsedDate}.
      </div>

              <!-- LOGO -->
              <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2. URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content=logo&utm_campaign={{Campaign-Name}} -->
              <table>
                <tr>
                  <td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; line-height: 130%;
                    padding-top: 15px;
                    padding-bottom: 15px;
                    color: #000000;
                    font-family: sans-serif;" class="header">
                    <a target="_blank" style="text-decoration: none;" href="https://my-daily-reads.netlify.app"><img
                        border="0" vspace="0" hspace="0"
                        src="https://res.cloudinary.com/djx5h4cjt/image/upload/c_scale,h_50/my-daily-reads/logo.png"
                        width="50" height="50" alt="Logo" title="Logo"
                        style="
                        color: #000000;
                        font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- HEADER -->
          <!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 20px; font-weight: bold; line-height: 130%;
			padding-top: 20px; padding-bottom: 20px;
			color: #FFFFFF;
			font-family: sans-serif;" class="header">
              Here are some interesting reads we've compiled for you for <i>${parsedDate}</i>.
              <br />
              <!-- [ ${keywords[0]}, ${keywords[1]} ] -->
            </td>
          </tr>

          <!-- HERO IMAGE -->
          <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 (wrapper x2). Do not set height for flexible images (including "auto"). URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Ìmage-Name}}&utm_campaign={{Campaign-Name}} -->
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero">
              <a target="_blank" style="text-decoration: none;" href="${content[0].url}">
                <img border="0" vspace="0" hspace="0"
                  src="${content[0].image}"
                  alt="Please enable images to view this content" title="Hero Image" width="530"
                  style="width: 88.33%;
				max-width: 530px;
				color: #FFFFFF; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block; border-radius: 15px" />
              </a>
            </td>
          </tr>

          <!-- PARAGRAPH -->
          <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 25px;
            padding-bottom: 25px;
			color: #FFFFFF;
			font-family: sans-serif;" class="paragraph">
              <b style="color:#ffffff; text-decoration: none; font-size: 18px">
              <a style="color: #ffffff; text-decoration: none; line-height: 1.2" href="${content[0].url}">${content[0].title}</a></b>
              
              <br />
              <br />
              ${content[0].description}

            </td>
          </tr>

          <!-- End of WRAPPER -->
        </table>

        <!-- SECTION / BACKGROUND -->
        <!-- Set section background color -->
      </td>
    </tr>
    <tr>
      <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
	padding-top: 5px;" bgcolor="#FFFFFF">

        <!-- WRAPPER -->
        <!-- Set conteiner background color -->
        <table border="0" cellpadding="0" cellspacing="0" align="center" width="600" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 600px;">

          <!-- FLOATERS -->
          <!-- Floaters (left align tables) need extra 10px spacing in a line (Outlook fix). Floater table width = (wrapper width / 2) - 10px. Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height. Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2. Do not set height for flexible images (including "auto"). URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Ìmage-Name}}&utm_campaign={{Campaign-Name}} -->
          <tr>
            <td align="center" valign="top"
              style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 10px; padding-right: 10px;"
              class="floaters">
              <table width="280" border="0" cellpadding="0" cellspacing="0" align="left" valign="top"
                style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; margin: 0; padding: 0; display: inline-table; float: none;"
                class="floater">
                <tr>
                  <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 15px; padding-right: 15px; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 30px; 
			font-family: sans-serif;
			color: #000000;"><a target="_blank" style="text-decoration: none;
			font-size: 17px; line-height: 160%;" href="${content[1].url}"><img border="1" vspace="0"
                        hspace="0"
                        src="${content[1].image}"
                        width="250" height="142" alt="Grid Item" title="Grid Item"
                        style="
			color: #000000; font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block; margin-bottom: 8px; border-radius: 10px; border: 3px solid #a3b8d9;" /></a>
                  </td>
                </tr>
                <tr>
                  <td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 15px; padding-right: 15px; font-size: 17px; font-weight: 400; line-height: 160%;
                  padding-top: 10px;
			font-family: sans-serif;
			color: #000000;"><a target="_blank" style="text-decoration: none;
			font-size: 17px; line-height: 160%;" href="${content[1].url}">
                      <b style="color:#0B5073; text-decoration: none;">${limitString(content[1].title, 57)}</b></a>
                      <br />
                    ${limitString(content[1].description, 87)}
                  </td>
                </tr>
              </table>
              <table width="280" border="0" cellpadding="0" cellspacing="0" align="right" valign="top"
                style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; margin: 0; padding: 0; display: inline-table; float: none;"
                class="floater">
                <tr>
                  <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 15px; padding-right: 15px; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 30px; 
			font-family: sans-serif;
			color: #000000;"><a target="_blank" style="text-decoration: none;
			font-size: 17px; line-height: 160%;" href="${content[2].url}"><img border="0" vspace="0"
                        hspace="0"
                        src="${content[2].image}"
                        width="250" height="142" alt="Grid Item" title="Grid Item"
                        style="
			color: #000000; font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block; margin-bottom: 8px; border-radius: 10px; border: 3px solid #a3b8d9;" /></a>
                  </td>
                </tr>
                <tr>
                  <td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 15px; padding-right: 15px; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 10px;
			font-family: sans-serif;
			color: #000000;"><a target="_blank" style="text-decoration: none;
			font-size: 17px; line-height: 160%;" href="${content[2].url}">
                      <b style="color:#0B5073; text-decoration: none;">${limitString(content[2].title, 57)}</b></a><br />
                    ${limitString(content[2].description, 87)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FLOATERS -->
          <!-- Floaters (left align tables) need extra 10px spacing in a line (Outlook fix). Floater table width = (wrapper width / 2) - 10px. Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height. Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2. Do not set height for flexible images (including "auto"). URL format: http://domain.com/?utm_source={{Campaign-Source}}&utm_medium=email&utm_content={{Ìmage-Name}}&utm_campaign={{Campaign-Name}} -->
          <tr>
            <td align="center" valign="top"
              style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 10px; padding-right: 10px;"
              class="floaters">
              <table width="280" border="0" cellpadding="0" cellspacing="0" align="right" valign="top"
                style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; margin: 0; padding: 0; display: inline-table; float: none;"
                class="floater">
                <tr>
                  <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 15px; padding-right: 15px; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 30px;
			font-family: sans-serif;
			color: #000000;"><a target="_blank" style="text-decoration: none;
			font-size: 17px; line-height: 160%;" href="${content[3].url}"><img border="0" vspace="0"
                        hspace="0"
                        src="${content[3].image}"
                        width="250" height="142" alt="Grid Item" title="Grid Item"
                        style="
			color: #000000; font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block; margin-bottom: 8px; border-radius: 10px; border: 3px solid #a3b8d9;" /></a>
                  </td>
                </tr>
                <tr>
                  <td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 15px; padding-right: 15px; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 10px;
			font-family: sans-serif;
			color: #000000;"><a target="_blank" style="text-decoration: none;
			font-size: 17px; line-height: 160%;" href="${content[3].url}">
                      <b style="color:#0B5073; text-decoration: none;">${limitString(content[3].title, 57)}</b></a><br />
                    ${limitString(content[3].description, 87)}
                  </td>
                </tr>
              </table>
              <table width="280" border="0" cellpadding="0" cellspacing="0" align="left" valign="top"
                style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0; margin: 0; padding: 0; display: inline-table; float: none;"
                class="floater">
                <tr>
                  <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 15px; padding-right: 15px; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 30px;
			font-family: sans-serif;
			color: #000000;"><a target="_blank" style="text-decoration: none;
			font-size: 17px; line-height: 160%;" href="${content[4].url}"><img border="0" vspace="0"
                        hspace="0"
                        src="${content[4].image}"
                        width="250" height="142" alt="Grid Item" title="Grid Item"
                        style="
			color: #000000; font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block; margin-bottom: 8px; border-radius: 10px; border: 3px solid #a3b8d9;" /></a>
                  </td>
                </tr>
                <tr>
                  <td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 15px; padding-right: 15px; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 10px;
			padding-bottom: 30px;
			font-family: sans-serif;
			color: #000000;"><a target="_blank" style="text-decoration: none;
			font-size: 17px; line-height: 160%;" href="${content[4].url}">
                      <b style="color:#0B5073; text-decoration: none;">${limitString(content[4].title, 57)}</b></a><br />
                    ${limitString(content[4].description, 87)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- End of WRAPPER -->
        </table>

        <!-- SECTION / BACKGROUND -->
        <!-- Set section background color -->
      </td>
    </tr>
    <tr>
      <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
        bgcolor="#F0F0F0">

        <!-- WRAPPER -->
        <!-- Set wrapper width (twice) -->
        <table border="0" cellpadding="0" cellspacing="0" align="center" width="600" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 600px;" class="wrapper">

          <!-- FOOTER -->
          <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
          <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
			padding-top: 20px;
			padding-bottom: 20px;
			color: #999999; 
			font-family: sans-serif;" class="footer">

              This email was sent to&nbsp;you becouse you&nbsp;are subscribed&nbsp;to the&nbsp;My Daiy Reads
              content&nbsp;. You&nbsp;can <a href="${SITE_URL}/unsubscribe?email=${encodeURIComponent(user.email)}"
                target="_blank"
                style="text-decoration: underline; color: #999999; font-family: sans-serif; font-size: 13px; font-weight: 400; line-height: 150%;">unsubscribe</a>
              from these emails anytime.

              <!-- ANALYTICS -->
              <!-- http://www.google-analytics.com/collect?v=1&tid={{UA-Tracking-ID}}&cid={{Client-ID}}&t=event&ec=email&ea=open&cs={{Campaign-Source}}&cm=email&cn={{Campaign-Name}} -->
              <!-- <img width="1" height="1" border="0" vspace="0" hspace="0" style="margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;"
				src="https://raw.githubusercontent.com/konsav/email-templates/master/images/tracker.png" /> -->

            </td>
          </tr>

          <!-- End of WRAPPER -->
        </table>

        <!-- End of SECTION / BACKGROUND -->
      </td>
    </tr>
  </table>

</body>

</html>
`;
};

module.exports = {
  ContentEmailHtml
}