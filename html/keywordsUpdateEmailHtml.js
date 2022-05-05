/***
 * @param { String } firstName Receiver's first name
 * @param { String } keywordsText Content keywords
 * @param { String } email Receiver's email address
 */
export function KeywordsUpdateEmailHtml (firstName, keywordsText, email){
  return new String(`
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0;">
      <meta name="format-detection" content="telephone=no">

      

      <!-- MESSAGE SUBJECT -->
      <title>My Daily Reads content keywords updated</title>

    </head>

    <!-- BODY -->
    <!-- Set message background color (twice) and text color (twice) -->
    <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse;border-spacing: 0;margin: 0;padding: 0;width: 100%;height: 100%;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 100%;background-color: #F0F0F0;color: #000000;min-width: 100%;" bgcolor="#F0F0F0" text="#000000">

    <!-- SECTION / BACKGROUND -->
    <!-- Set message background color one again -->
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;border-spacing: 0;margin: 0;padding: 0;width: 100%;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse;border-spacing: 0;margin: 0;padding: 0;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" bgcolor="#F0F0F0">

    <!-- WRAPPER -->
    <!-- Set wrapper width (twice) -->
    <table border="0" cellpadding="0" cellspacing="0" align="center" width="560" style="border-collapse: collapse;border-spacing: 0;padding: 0;width: inherit;max-width: 560px;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="wrapper">

      <tr>
        <td align="left" valign="top" style="border-collapse: collapse;border-spacing: 0;margin: 0;padding: 0;width: 87.5%;padding-top: 20px;padding-bottom: 20px;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">

                <table style="-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-spacing: 0;border-collapse: collapse !important;">
                    <tr>
                        <td align="left" valign="top" style="border-collapse: collapse;border-spacing: 0;margin: 0;padding: 0;padding-left: 6.25%;padding-right: 6.25%;line-height: 130%;padding-top: 15px;color: #000000;font-family: sans-serif;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="header">
                            <a target="_blank" style="text-decoration: none;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 100%;color: #127DB3;" href="https://my-daily-reads.netlify.app"><img border="0" vspace="0" hspace="0" src="https://res.cloudinary.com/djx5h4cjt/image/upload/c_scale,h_50/my-daily-reads/logo.png" width="50" height="50" alt="Logo" title="Logo" style="color: #000000;font-size: 10px;margin: 0;padding: 0;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;border: none;display: block;line-height: 100%;"></a>
                        </td>
                        <td align="left" valign="top" style="border-collapse: collapse;border-spacing: 0;margin: 0;padding: 0;padding-left: 6.25%;padding-right: 6.25%;width: 87.5%;font-size: 24px;font-weight: 800;line-height: 130%;padding-top: 25px;color: #3d4656;font-family: sans-serif;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="header">
                            My Daily Reads
                        </td>
                    </tr>
                </table>

          <!-- PREHEADER -->
          <!-- Set text color to background color -->
          <div style="display: none;visibility: hidden;overflow: hidden;opacity: 0;font-size: 1px;line-height: 1px;height: 0;max-height: 0;max-width: 0;color: #F0F0F0;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="preheader">
            My Daily Reads content keywords updated.</div>

        </td>
      </tr>

    <!-- End of WRAPPER -->
    </table>

    <!-- WRAPPER / CONTAINER -->
    <!-- Set conteiner background color -->
    <table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#FFFFFF" width="560" style="border-collapse: collapse;border-spacing: 0;padding: 0;width: inherit;max-width: 560px;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="container">

      <!-- PARAGRAPH -->
      <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse;border-spacing: 0;margin: 0;padding: 0;padding-left: 6.25%;padding-right: 6.25%;width: 87.5%;font-size: 20px;font-weight: 600;line-height: 160%;padding-top: 30px;padding-bottom: 30px;color: #000000;font-family: sans-serif;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="paragraph">
        Hello ${firstName}, you've successfully subscribed to My Daily Reads.
        </td>
      </tr>

      <!-- PARAGRAPH -->
      <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse;border-spacing: 0;margin: 0;padding: 0;padding-left: 6.25%;padding-right: 6.25%;width: 87.5%;font-size: 18px;font-weight: 500;line-height: 160%;padding-top: 30px;padding-bottom: 30px;color: #222222;font-family: sans-serif;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="paragraph">
            We'll now be sending you daily dev content tailored to ${keywordsText}.
        </td>
      </tr>

      <!-- LINE -->
      <!-- Set line color -->
      <tr>	
        <td align="center" valign="top" style="border-collapse: collapse;border-spacing: 0;margin: 0;padding: 0;padding-left: 6.25%;padding-right: 6.25%;width: 87.5%;padding-top: 25px;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="line"><hr color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;">
        </td>
      </tr>

      <!-- PARAGRAPH -->
      <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse;border-spacing: 0;margin: 0;padding: 0;padding-left: 6.25%;padding-right: 6.25%;width: 87.5%;font-size: 17px;font-weight: 400;line-height: 160%;padding-top: 20px;padding-bottom: 25px;color: #000000;font-family: sans-serif;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="paragraph">
            Have a&nbsp;question? <a href="https://my-daily-reads.netlify.app/faq" target="_blank" style="color: #127DB3;font-family: sans-serif;font-size: 17px;font-weight: 400;line-height: 160%;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">read our faq</a>
        </td>
      </tr>

    <!-- End of WRAPPER -->
    </table>

    <!-- WRAPPER -->
    <!-- Set wrapper width (twice) -->
    <table border="0" cellpadding="0" cellspacing="0" align="center" width="560" style="border-collapse: collapse;border-spacing: 0;padding: 0;width: inherit;max-width: 560px;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="wrapper">

      <!-- FOOTER -->
      <!-- Set text color and font family ("sans-serif" or "Georgia, serif"). Duplicate all text styles in links, including line-height -->
      <tr>
        <td align="center" valign="top" style="border-collapse: collapse;border-spacing: 0;margin: 0;padding: 0;padding-left: 6.25%;padding-right: 6.25%;width: 87.5%;font-size: 13px;font-weight: 400;line-height: 150%;padding-top: 20px;padding-bottom: 20px;color: #999999;font-family: sans-serif;-webkit-font-smoothing: antialiased;text-size-adjust: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" class="footer">

            This email was sent to&nbsp;you becouse you&nbsp;are subscribed&nbsp;to the&nbsp;My Daiy Reads
            content&nbsp;. You&nbsp;can <a href="${SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}"
              target="_blank"
              style="text-decoration: underline; color: #999999; font-family: sans-serif; font-size: 13px; font-weight: 400; line-height: 150%;">unsubscribe</a>
            from these emails anytime.

            <!-- ANALYTICS -->
            <!-- http://www.google-analytics.com/collect?v=1&tid={{UA-Tracking-ID}}&cid={{Client-ID}}&t=event&ec=email&ea=open&cs={{Campaign-Source}}&cm=email&cn={{Campaign-Name}} -->
            <img width="1" height="1" border="0" vspace="0" hspace="0" style="margin: 0;padding: 0;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;border: none;display: block;line-height: 100%;" src="#">

        </td>
      </tr>

    <!-- End of WRAPPER -->
    </table>

    <!-- End of SECTION / BACKGROUND -->
    </td></tr></table>

    </body>
  </html>`);
}