# CyberSource Checkout API Node.js Example
> An example on how to integrate CyberSource's Checkout API (formerly known as Silent Order POST) to a Node.js web application.

## Requirements

* Node.js 10+
* A CyberSource Business Center account.

## Getting started

1. Create a new _Secure Acceptance_ profile.
2. Generate a set of security keys for the profile.
3. Set the following environment variables
    ```sh
    CYBERSOURCE_CHECKOUT_API_ACCESS_KEY=
    CYBERSOURCE_ORG_ID=
    CYBERSOURCE_CHECKOUT_API_PROFILE_ID=
    CYBERSOURCE_CHECKOUT_API_SECRET_KEY=
    CYBERSOURCE_CUSTOMER_RESPONSE_ENDPOINT=
    ```
    _Note: Check out CyberSource's documentation for a description of this variables and where to get their values._
4. `npm install` (or `yarn install`)
5. `npm start` or (`yarn start`)

