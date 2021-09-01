const Model = require("../models/modelSchema");
const uuid = require("uuid");

module.exports = {

  // Criar modelo
  async create(request, response) {
    try {

      const {
        id = uuid.v1(),
        modelName,
        type,
        manufacturer,
        releaseYear,
        min_temp,
        max_temp,
        min_current,
        max_current,
        min_voltage,
        max_voltage,
        min_vibra,
        max_vibra,
      } = request.body;

      const model = await Model.create({
        id,
        modelName,
        type,
        manufacturer,
        releaseYear,
        min_temp,
        max_temp,
        min_current,
        max_current,
        min_voltage,
        max_voltage,
        min_vibra,
        max_vibra,
      });

      return response.status(200).json({ model });
    } catch (err) {
      if (err.message)
        return response.status(400).json({ notification: err.message });

      console.log("Model creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to register model",
      });
    }
  },

  // Listar todos os modelos
  async index(request, response) {
    try{
        const data = await Model.scan().exec();

        return response.status(200).json({ data });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ notification: "Internal server error" });
    }
  },

  // Buscar por id
  async find_id(request, response) {
    try {
      const model = await Model.get(request.params.id);

      return response.status(200).json({ model });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Internal server error while trying to find the model" });
    }
  },

  // Atualizar modelos
  async update(request, response) {
    try {
      const { id } = request.params;

      const {
        modelName,
        type,
        manufacturer,
        releaseYear,
        min_temp,
        max_temp,
        min_current,
        max_current,
        min_voltage,
        max_voltage,
        min_vibra,
        max_vibra,
      } = request.body;

      const model = await Model.update(
        { id },
        {
          modelName,
          type,
          manufacturer,
          releaseYear,
          min_temp,
          max_temp,
          min_current,
          max_current,
          min_voltage,
          max_voltage,
          min_vibra,
          max_vibra,
        }
      );

      return response.status(200).json({ model });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ message: "Error while trying to update items" });
    }
  },

  // Deletar modelo
  async delete(request, response) {
    try {
      await Model.delete(request.params.id);

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
};