const crypto = require("crypto");

const express = require("express");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pick } = require("ramda");

const config = require("./config");

const app = express();

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));

const UNSIGNED_FIELD_NAMES = [ "card_number" ];
const SIGNED_FIELD_NAMES = [
  "access_key",
  "amount",
  "card_expiry_date",
  "card_type",
  "currency",
  "customer_ip_address",
  "device_fingerprint_id",
  "device_fingerprint_raw",
  "locale",
  "payment_method",
  "profile_id",
  "reference_number",
  "signed_date_time",
  "signed_field_names",
  "transaction_type",
  "transaction_uuid",
  "unsigned_field_names"
];

app.get("/", (req, res) => {
  const locals = {
    accessKey: config.cybersource.ACCESS_KEY,
    customerIpAddress: req.ip,
    deviceFingerprintId: uuid.v4(),
    orgId: config.cybersource.ORG_ID,
    profileId: config.cybersource.PROFILE_ID,
    referenceNumber: uuid.v4(),
    signedFieldNames: SIGNED_FIELD_NAMES.join(","),
    unsignedFieldNames: UNSIGNED_FIELD_NAMES.join(",")
  };

  res.render("checkout", locals);
});

app.post("/", cors({ origin: config.CORS_ALLOWED_HOSTS }), (req, res) => {
  const { body: input } = req;
  const allFieldsToSign = {
    ...pick(SIGNED_FIELD_NAMES, input),
    signed_date_time: convertToSignatureDate(new Date()),
    signed_field_names: SIGNED_FIELD_NAMES.join(","),
    unsigned_field_names: UNSIGNED_FIELD_NAMES.join(",")
  };
  const signature = sign(allFieldsToSign);

  res.json({ ...allFieldsToSign, signature });
});

app.post(config.cybersource.CUSTOMER_RESPONSE_ENDPOINT, (req, res) => {
  res.json(req.body);
});

app.listen(3000);

console.log("Listening at http://localhost:3000");

function convertToSignatureDate(d) {
  const [ isoDate ] = d.toISOString().split(".");

  return `${isoDate}Z`;
}

function sign(fields) {
  const hash = crypto.createHmac("sha256", config.cybersource.SECRET_KEY);
  const encodedFields = Object.keys(fields).sort().map(k => `${k}=${fields[ k ]}`).join(",");

  return hash.update(encodedFields).digest("base64");
}

