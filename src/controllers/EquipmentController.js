const Equipment = require("../models/equipmentSchema");
const uuid = require("uuid");
const User = require("../models/userSchema");

module.exports = {
  // Criar equipamentos
  async create(request, response) {
    try {

      let client_id;

      const {
        equipment_code,
        id_model,
        installation_date,
        situation,
        // initial_work,
        maintenance,
        address,
        zipcode,
        observation,
        phone_number
      } = request.body;

      let { cpfcnpj } = request.body

      const initial_work = installation_date; // inicialmente

      const flag_connection = "Pendente";
    
      const id = uuid.v1();

      if (!cpfcnpj) cpfcnpj = "";

      const existingEquipments = await Equipment.scan({
        equipment_code: equipment_code,
      }).exec();

      const existingPF = await User.scan({
        cpf: cpfcnpj
      }).exec();

      const existingPJ = await User.scan({
        cnpj: cpfcnpj
      }).exec();

      if (cpfcnpj && !existingPF.count && !existingPJ.count) {
        return response
          .status(400)
          .json({ notification: "CPF / CNPJ não cadastrado no sistema." });
      }

      if (cpfcnpj && cpfcnpj !== "") {
        // add o novo equipamento no vetor do cliente
        const targetClient = existingPF.count ? existingPF[0] : existingPJ[0];
        client_id = targetClient.id;

        try {

          let newIdEquipments = [];

          if (targetClient.id_equipments) {
            newIdEquipments = targetClient.id_equipments;
            newIdEquipments.push(id);
          } else newIdEquipments = [id];

          await User.update(
            { id: targetClient.id },
            { id_equipments: newIdEquipments }
          );

        } catch (err) {
          console.log(err);
          return response
            .status(500)
            .json({ notification: "Erro ao salvar o id no vetor do cliente." });
        }
      }

      if (!existingEquipments.count) {

        const equipment = await Equipment.create({
          id,
          equipment_code,
          id_model,
          installation_date,
          situation,
          initial_work,
          maintenance,
          address,
          zipcode,
          flag_connection,
          observation,
          client_id,
          phone_number
        });

        return response.status(200).json({
          id: equipment.id,
          notification: "Equipment created successfully!",
        });
      } else {
        return response
          .status(400)
          .json({ notification: "Código de equipamento já está em uso!" });
      }

    } catch (err) {
      if (err.message) {
        return response.status(400).json({ notification: err.message });
      }

      console.log("Equipment creation failed: " + err);
      return response.status(500).json({
        notification:
          "Internal server error while trying to register equipment",
      });
    }
  },

  // Buscar todos os equipamentos (se for cliente so mostra os dele)
  async index(request, response) {
    try {

      const userSession = request.session;
      let equipment = [];

      if (userSession.userData.type === "Funcionario") {
        equipment = await Equipment.scan().exec();
      } else {

        const allEquipment = await Equipment.scan().exec();
        const auxVector = userSession.userData.id_equipments ? userSession.userData.id_equipments : [];
        if (equipment) {
          allEquipment.forEach((equipments) => {
            if (auxVector.includes(equipments.id)) {
              equipment.push(equipments);
            }
          })
        }
      } 

      return response.status(200).json({ equipment });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to get all equipments" });
    }
  },

  // Buscar equipamento por ID
  async find_id(request, response) {
    try {
      const { id } = request.params;
      const equipment = await Equipment.scan({ id: id }).exec();
      return response.status(200).json({ equipment });
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        notification:
          "Internal server error while trying to find the manufacturer",
      });
    }
  },

  // Buscar situação
  async find_situation(request, response) {
    try {

      const { situation } = request.params;
      const userSession = request.session;
      let allEquipment = await Equipment.scan({ situation: situation }).exec();
      let clientEquipments = [];

      if (userSession.userData.type !== "Funcionario") {
        const auxVector = userSession.userData.id_equipments ? userSession.userData.id_equipments : [];
        // console.log(auxVector);
        allEquipment.forEach((equipments) => {
          if (auxVector.includes(equipments.id)) {
            clientEquipments.push(equipments);
          }
        })
      } else{
        clientEquipments = allEquipment;
      }

      return response.status(200).json({ equipment: clientEquipments });

    } catch (err) {
      console.log(err);
      return response.status(500).json({
        notification:
          "Internal server error while trying to find the manufacturer",
      });
    }
  },

  // Atualizar dados
  async update(request, response) {
    try {
      const { id } = request.params;
      let client_id;

      if (!request.body.cpfcnpj) {

        const equipment = await Equipment.update({ id }, request.body);

        return response.status(200).json({ equipment });
      } else {
        // primeiro salva no vetor do schema do usuário
        const { cpfcnpj } = request.body;

        const existingPF = await User.scan({
          cpf: cpfcnpj
        }).exec();

        const existingPJ = await User.scan({
          cnpj: cpfcnpj
        }).exec();

        if (cpfcnpj && !existingPF.count && !existingPJ.count) {
          return response
            .status(400)
            .json({ notification: "CPF / CNPJ não cadastrado no sistema." });
        }

        if (cpfcnpj) {
          // add o novo equipamento no vetor do cliente
          const targetClient = existingPF.count ? existingPF[0] : existingPJ[0];
          client_id = targetClient.id;

          try {

            let newIdEquipments = [];

            if (targetClient.id_equipments) {
              newIdEquipments = targetClient.id_equipments;
              newIdEquipments.push(id);
            } else newIdEquipments = [id];

            await User.update(
              { id: targetClient.id },
              { id_equipments: newIdEquipments }
            );

          } catch (err) {
            console.log(err);
            return response
              .status(500)
              .json({ notification: "Erro ao salvar o id no vetor do cliente." });
          }
        }
      }

      // agora salva no schema da bomba os demais dados E o id do usuário
      const data = request.body;
      delete data['cpfcnpj'];
      data.client_id = client_id;

      const equipment = await Equipment.update({ id }, data);

      return response.status(200).json({ equipment });

    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to update items" });
    }
  },

  //  Deletar equipamento
  async delete(request, response) {
    try {

      const equipmentToDelete = await Equipment.scan({
        id: request.params.id
      }).exec();

      // se ele é associado a um cliente, atualza o vetor do cliente também
      if (equipmentToDelete[0].client_id) {

        const client_id = equipmentToDelete[0].client_id;
        

        const userToUpdate = await User.scan({
          id: client_id
        }).exec();

        if (userToUpdate[0]) {
          let arrayEquipments = userToUpdate[0].id_equipments;

          // remove o id do equipamento do vetor
          arrayEquipments = arrayEquipments.filter((idEquipment) => idEquipment !== request.params.id)
  
          await User.update(
            { id: client_id },
            { id_equipments: arrayEquipments }
          );
        } 
      }

      // depois de tudo, deleta do schema do equipamento
      await Equipment.delete(request.params.id);

      return response
        .status(200)
        .json({ notification: "Sucessfully deleted item" });

    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ notification: "Error while trying to delete items" });
    }
  },

  // Salvar tempo de funcionamento
  async set_work_time(request, response) {
    try {
      const { id_equipment, worktime } = request.body;

      let equipment = await Equipment.scan({
        id_equipment: id_equipment,
      }).exec();
      let update = equipment[0];
      update.work_time += worktime;
      let { id, work_time } = update;

      const update_work_time = await Equipment.update(
        { id },
        {
          work_time,
        }
      );
      return response.status(200).json({ update_work_time });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ notification: "Error while trying to set work time" });
    }
  },
};
