//const connection = require('../database/connection');
const FirebaseModel = require("../models/FirebaseModel");
const uuid = require("uuid");
const User = require("../models/userSchema");

module.exports = {
  async find(request, response) {
    try {
      const user = await User.get(request.params.id);

      return response.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to validate credentials" });
    }
  },

  async findByFirebase(request, response) {
    try {
      const user = await User.scan({
        firebaseUid: request.params.firebaseUid,
      }).exec();

      return response.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to validate credentials" });
    }
  },

  async index(request, response) {
    try {
      const user = await User.scan().exec();

      return response.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to validate credentials" });
    }
  },

  async create(request, response) {
    let check;

    try {
      const {
        id = uuid.v1(),
        firebaseUid = "temp", // é atualizado mais para frente
        name,
        type,
        birthdate,
        email,
        password,

        phonenumber,
        corporate_name,
        state_registration,
        active,
        cpf,
        cnpj,
        id_equipments,
      } = request.body;

      if (type === "PJ") {
        const responseCNPJ = await User.scan({
          cnpj: cnpj,
        }).exec();

        const responseEmail = await User.scan({
          email: email,
        }).exec();

        if (responseCNPJ.count === 0 && responseEmail.count === 0) {
          await User.create({
            id,
            firebaseUid,
            name,
            type,
            birthdate,
            email,
            password,

            phonenumber,
            corporate_name,
            state_registration,
            active,
            cnpj,
            id_equipments,
          });

          check = true;
        } else {
          if (responseCNPJ.count !== 0) {
            return response
              .status(400)
              .json({ notification: "CNPJ já está em uso!" });
          } else if (responseEmail.count !== 0) {
            return response
              .status(400)
              .json({ notification: "Email já está em uso!" });
          }
        }
      } else {
        // type = "PF" || type = "Funcionário"

        const responseCPF = await User.scan({
          cpf: cpf,
        }).exec();

        const responseEmail = await User.scan({
          email: email,
        }).exec();

        if (responseCPF.count === 0 && responseEmail.count === 0) {
          await User.create({
            id,
            firebaseUid,
            name,
            type,
            birthdate,
            email,

            phonenumber,
            active,
            cpf,
            id_equipments,
          });

          check = true;
        } else {
          if (responseCPF.count !== 0) {
            return response
              .status(400)
              .json({ notification: "CPF já está em uso!" });
          } else if (responseEmail.count !== 0) {
            return response
              .status(400)
              .json({ notification: "Email já está em uso!" });
          }
        }
      }

      if (check) {
        let firebaseId;
        firebaseId = await FirebaseModel.createNewUser(email, password);

        await User.update(
          { id },
          {
            firebaseUid: firebaseId,
          }
        );

        return response.status(200).json({ notification: "User created!" });
      } else {
        return response.status(400).json({ notification: "Dados inválidos!" });
      }
    } catch (err) {
      if (err.message)
        return response.status(400).json({ notification: err.message });

      console.log("User creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to register user",
      });
    }
  },

  // Atualizar usuário
  async update(request, response) {
    try {
      const { id } = request.params;

      const updatedUser = await User.update(
        { id },
        request.body // altera SOMENTE o que está no body
      );
      return response.status(200).json({ updatedUser });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to update user." });
    }
  },

  async updateFirebase(request, response) {
    try {
      const { uid } = request.params;
      const { password, email} = request.body;

      await FirebaseModel.updateFirebase(password, email, uid);
      return response.status(200).json("sucess");
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to update password." });
    }
  },

  async getFirebase(request, response) {
    try {
      const { firebaseUid } = request.params;

      const firebaseData = await FirebaseModel.getFirebase(firebaseUid);
      return response.status(200).json({ firebaseData });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to update password." });
    }
  },

  //  Deletar usuário, tanto do banco quanto do firebase
  async deleteById(request, response) {
    try {
      // acha os dados do usuario que se deseja deletar
      const userToDelete = await User.query({ id: request.params.id }).exec();

      // deleta do firebase
      await FirebaseModel.deleteUser(userToDelete[0].firebaseUid).catch(
        (err) => {
          if (err) {
            console.log(err);

            return response.status(404).json({
              notification: "Error when attempting to delete from Firebase.",
            });
          }
        }
      );

      // deleta do banco
      User.delete(request.params.id);

      return response
        .status(200)
        .json({ notification: "Sucessfully deleted item" });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ notification: "Error while trying to delete user" });
    }
  },
};
