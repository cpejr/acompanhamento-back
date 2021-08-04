const dynamoose = require("dynamoose");

dynamoose.aws.sdk.config.update({
  region: process.env.REGION,
});

const modelSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true },
    modelName: { type: String, required: true },
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    releaseYear: { type: String, required: true },
    // temperatureLimit: { type: Number, required: true }, 
    // currentLimit: { type: Number, required: true },
    // voltageLimit: { type: Number, required: true },
    min_temp: { type: Number, required: true },
    max_temp: { type: Number, required: true },
    min_current: { type: Number, required: true },
    max_current: { type: Number, required: true },
    min_voltage: { type: Number, required: true },
    max_voltage: { type: Number, required: true },
    min_vibra: { type: Number, required: true },
    max_vibra: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = dynamoose.model("Models", modelSchema);
