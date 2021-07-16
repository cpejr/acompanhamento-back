const dynamoose = require("dynamoose");
const uuid = require("uuid");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const userSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true },
    firebaseUid: {type: String, optional: true},
    name: { type: String, required: true },
    type: { type: String, required: true },
    birthdate: { type: String, required: true },
    email: { type: String, required: true },

    phonenumber: { type: String, optional: true },
    active: { type: String, optional: true },
    cpf: { type: String, optional: true },
    cnpj: { type: String, optional: true }, 
    id_equipments: {
      type: Array,
      schema: [
        {
          type: String
        },
      ],
      optional: true
    }
  },
  { timestamps: true }
);

module.exports = dynamoose.model("User", userSchema);
