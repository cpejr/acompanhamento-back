const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "Equipment",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }, //Partition key
    //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }, //Partition key
    //Sort key
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Não foi possível criar a tabela. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Tabela criada com sucesso. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
