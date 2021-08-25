const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "Models",
  Item: {
    id: {
      S: "1243",
    },
    modelName: {
      S: "1234",
    },
    type: {
      S: "1234444",
    },
    manufacturer: {
      S: "12345",
    },
    releaseYear: {
      S: "1998",
    },
    min_temp: {
      N: "123",
    },
    max_temp: {
      N: "12345",
    },
    min_current: {
      N: "123",
      },
    max_current: {
      N: "12345",
    },
    min_voltage: {
      N: "123",
    },
    max_voltage: {
      N: "12345",
    },
    min_vibra: {
      N: "123",
    },
    max_vibra: {
      N: "12345",
    }
  },
};

dynamodb.putItem(params, function (err, data) {
  if (err) {
    console.error(
      "Foi impossível atualizar a tabela. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Tabela Atualizada. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
