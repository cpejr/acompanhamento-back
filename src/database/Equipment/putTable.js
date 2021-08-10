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
  Item: {
    id: {
      S: "1243",
    },
    equipment_code: {
      S: "1234",
    },
    id_model: {
      S: "1234444",
    },
    installation_date: {
      S: "12/10/2000",
    },
    situation: {
      S: "Revisão",
    },
    initial_work: {
      S: "12/10/2000",
    },
    maintenance: {
        M: {
            date: { S: "01/01/1902" },
            description: { S: "Foi um desastre!" }
        }
    },
    address: {
      S: "Rua do desespero, 1000",
    },
    zipcode: {
      S: "31034000",
    },
    last_visit: {
      S: "12/01/2002",
    },
    flag_connection : {
      S: "rico",
    },
    observation : {
      S : "O dia esta lindo",
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
