const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "Data",
  Item: {
    id: {
      S: "1243",
    },
    id_equipment: {
      S: "eq1243",
    },
    temperature: {
      N: "12",
    },
    votlage: {
      N: "100",
    },
    current: {
      N: "560",
    },
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
