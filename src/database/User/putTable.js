const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "User",
  Item: {
    id: {
      S: "1243",
    },
    firebaseUid: {
        S: "abc1234"
    },
    name: {
        S: "nome123"
    }, 
    type: {
        S: "nome123"
    }, 
    birthdate: {
        S: "01/01/1901"
    }, 
    email: {
        S: "email@gmail.com"
    }, 
    phonenumber: {
        S: "319987758933"
    }, 
    active: {
        S: "10/06/2021"
    }, 
    cpf: {
      S: "1234567",
    },
    cnpj: {
      S: "99882736312",
    },
    id_equipments: {
      L: [
        { S: "id01" },
        { S: "id02" },
        { S: "id03" },
      ]
    },
    corporate_name: {
      S: "nameCorporate",
    },
    state_registration: {
      S: "stateResgistration",
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
