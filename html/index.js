const { indexHtml } = require("./indexHtml");
const { messageHtml } = require("./messageHtml");
const { successHtml } = require("./successHtml");
const { NotFoundHtml } = require("./notFoundHtml");
const { otpEmailHtml } = require("./otpEmailHtml");
const { ContentEmailHtml } = require("./contentEmailHtml");
const { WelcomeEmailHtml } = require("./welcomeEmailHtml");
const { UnsubscribeRequestHtml } = require("./unsubscribeRequestHtml");

module.exports = {
  indexHtml,
  messageHtml,
  successHtml,
  NotFoundHtml,
  otpEmailHtml,
  ContentEmailHtml,
  WelcomeEmailHtml,
  UnsubscribeRequestHtml
}