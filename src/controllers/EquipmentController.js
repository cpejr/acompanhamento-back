const Equipment = require("../models/equipmentSchema");
const uuid = require("uuid");

module.exports = {

  // Criar equipamentos
  async create(request, response) {

    try {
      const {
        equipment_code,
        id_model,
        installation_date,
        situation,
        // initial_work,
        maintenance,
        address,
        zipcode,
        flag_connection,
        observation,
      } = request.body;

      const initial_work = installation_date; // inicialmente

      const id = uuid.v1();

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
      });

      return response.status(200).json({ id: equipment.id, notification: "Equipment created successfully!" });

    } catch (err) {
      if (err.message) {
        return response.status(400).json({ notification: err.message });
      }
        
      console.log("Equipment creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to register equipment",
      });
    }
  },

  // Buscar todos os equipamentos
  async index(request, response) {
    try {
      const equipment = await Equipment.scan().exec();

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
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the manufacturer",
        });
    }
  },

  // Buscar modelo
  async find_model(request, response) {
    try {
      const { id_model } = request.params;
      const equipment = await Equipment.scan({ id_model: id_model }).exec();
      return response.status(200).json({ equipment });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the manufacturer",
        });
    }
  },

// Buscar situação
  async find_situation(request, response) {
    try {
      const { situation } = request.params;
      const equipment = await Equipment.scan({ situation: situation }).exec();
      return response.status(200).json({ equipment });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the manufacturer",
        });
    }
  },

// Buscar cpf
  // async find_cpf_client(request, response) {
  //   try {
  //     const { cpf_client } = request.params;
  //     const equipment = await Equipment.scan({ cpf_client: cpf_client }).exec();
  //     return response.status(200).json({ equipment });
  //   } catch (err) {
  //     console.log(err);
  //     return response
  //       .status(500)
  //       .json({
  //         notification: "Internal server error while trying to find the manufacturer",
  //       });
  //   }
  // },

// Atualizar dados
  async update(request, response) {

    try {
      const { id } = request.params;

      const equipment = await Equipment.update(
        { id },
        request.body
      );

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
      const equipment = await Equipment.delete(request.params.id);
      

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
      const { 
        id_equipment, 
        worktime,
      } = request.body;

      let equipment = await Equipment.scan({ id_equipment: id_equipment }).exec();
      let update = equipment[0];
      update.work_time += worktime;
      let {id, work_time } = update;

      const update_work_time = await Equipment.update(
        { id },
        {
          work_time
        }
      );
      return response.status(200).json({ update_work_time });
    } catch (err) {
      console.log(err);
      return response.status(500).json({ notification: "Error while trying to set work time" });
    }
  }




};
