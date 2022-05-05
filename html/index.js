const { indexHtml } = require("./indexHtml");
const { messageHtml } = require("./messageHtml");
const { successHtml } = require("./successHtml");
const { KeywordsUpdateHtml } = require("./keywordsUpdateHtml");
const { NotFoundHtml } = require("./notFoundHtml");
const { otpEmailHtml } = require("./otpEmailHtml");
const { UpdateKeywordsRequestHtml } = require("./updateKeywordsRequestHtml");
const { ContentEmailHtml } = require("./contentEmailHtml");
const { WelcomeEmailHtml } = require("./welcomeEmailHtml");
const { FarewellEmailHtml } = require("./farewellEmailHtml");
const { UnsubscribeRequestHtml } = require("./unsubscribeRequestHtml");
const { KeywordsUpdateEmailHtml } = require("./keywordsUpdateEmailHtml");

module.exports = {
  indexHtml,
  messageHtml,
  successHtml,
  KeywordsUpdateHtml,
  NotFoundHtml,
  otpEmailHtml,
  UpdateKeywordsRequestHtml,
  FarewellEmailHtml,
  ContentEmailHtml,
  WelcomeEmailHtml,
  UnsubscribeRequestHtml,
  KeywordsUpdateEmailHtml
}