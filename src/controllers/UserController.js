//const connection = require('../database/connection');
const FirebaseModel = require("../models/FirebaseModel");
const uuid = require("uuid");
const User = require("../models/userSchema");
module.exports = {
  async index(request, response) {
    //const users = await ('users').select('*');
    //return response.json(users);
    return response;
  },

  async create(request, response) {
    let client;
    let check;
    try {
      const {
        zipcode,
        password,
        birthdate,
        phonenumber,
        complement,
        cpf,
        cnpj,
        address,
        id = uuid.v1(),
        email,
        name,
        type,
      } = request.body;

      if (type === "PJ") {
        const condition1 = await User.scan({
          cnpj: cnpj,
        }).exec();

        const condition3 = await User.scan({
          email: email,
        }).exec();

        if (condition1.count === 0 || condition3.count === 0) {
          client = await User.create({
            id,
            zipcode,
            password,
            birthdate,
            phonenumber,
            complement,
            cnpj,
            address,
            id,
            email,
            name,
            type,
          });

          check = true;
        }
      } else {
        const condition2 = await User.scan({
          cpf: cpf,
        }).exec();

        const condition3 = await User.scan({
          email: email,
        }).exec();

        // A condição acima scaneou se o cpf já estava sendo utilizado no BD, abaixo utiliza-se o if para validar
        // A tabela PRECISA estar criada!
        if (condition2.count === 0 || condition3.count === 0) {
          client = await User.create({
            id,
            zipcode,
            password,
            birthdate,
            phonenumber,
            complement,
            cpf,
            address,
            id,
            email,
            name,
            type,
          });

          check = true;
        }
      }

      if (check) {
        let firebaseUid;
        firebaseUid = await FirebaseModel.createNewUser(
          client.email,
          client.password
        );
        client.firebase = firebaseUid;

        delete client.password;
        return response.status(200).json({ notification: "User created!" });
      } else {
        return response
          .status(400)
          .json({ notification: "CPF already in use" });

        console.log("Client creation failed: CPF already in use");
      }

      //await connection('users').insert(user);
    } catch (err) {
      if (err.message)
        return response.status(400).json({ notification: err.message });

      console.log("Client creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to register client",
      });
    }
  },
};
