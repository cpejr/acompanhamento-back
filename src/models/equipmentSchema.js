const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const equipmentSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true},
    equipment_code: { type: String, required: true},
    id_model: { type: String, required: true },
    installation_date: { type: String, required: true },
    situation: { type: String, required: true },
    initial_work: { type: String, required: true },
    maintenance: { type: String, optional: true },
    address: { type: String, required: false },
    zipcode: { type: String, required: false },
    last_visit: { type: String, required: false },
    flag_connection: { type: String, required: false },
    observation: { type: String, required: false },
    client_id: { type: String, required: false },
    phone_number: {type: String, required: true }
  },
  { timestamps: true, useDocumentTypes: true }
);

module.exports = dynamoose.model("Equipment", equipmentSchema);