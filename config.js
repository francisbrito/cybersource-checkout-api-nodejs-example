const dotenv = require("dotenv");

dotenv.load();

exports.CORS_ALLOWED_HOSTS = [ "127.0.0.1", "0.0.0.0", "localhost" ];
exports.cybersource = {
  ACCESS_KEY: process.env.CYBERSOURCE_CHECKOUT_API_ACCESS_KEY,
  ORG_ID: process.env.CYBERSOURCE_ORG_ID,
  PROFILE_ID: process.env.CYBERSOURCE_CHECKOUT_API_PROFILE_ID,
  SECRET_KEY: process.env.CYBERSOURCE_CHECKOUT_API_SECRET_KEY,
  CUSTOMER_RESPONSE_ENDPOINT: process.env.CYBERSOURCE_CUSTOMER_RESPONSE_ENDPOINT,
};


