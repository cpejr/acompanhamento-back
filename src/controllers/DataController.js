const Data = require("../models/dataSchema");
const Equipment = require("../models/equipmentSchema");
const Model = require("../models/modelSchema");

const getMeasureStatus = require("../helpers/getMeasureStatus");
const uuid = require("uuid");

// numero de vezes que deve medir para mudar o status
const MEASURED_TIMES_STATUS_CHANGE = 2

let numberOfTimes = 0;

module.exports = {
  async create(request, response) {

    try {
      const {
        id_equipment,
        temperature,
        voltage,
        current
      } = request.body;
      const id = uuid.v1();

      const data = await Data.create({
        id,
        id_equipment,
        temperature,
        voltage,
        current,
      });

      // puxa os limites do modelo do equipamento
      const equipment = await Equipment.scan({ id: id_equipment }).exec();
      const modelData = await Model.scan({ id: equipment[0].id_model }).exec();

      const {
        min_temp,
        max_temp,
        min_current,
        max_current,
        min_voltage,
        max_voltage,
        min_vibra,
        max_vibra
      } = modelData[0];

      // analisa as medições conforme os limites do modelo
      let finalStatus;
      const allMeasuredStatus = [
        getMeasureStatus(temperature, { minimum: min_temp, maximum: max_temp }),
        getMeasureStatus(voltage, { minimum: min_voltage, maximum: max_voltage }),
        getMeasureStatus(current, { minimum: min_current, maximum: max_current })
      ];

      if (allMeasuredStatus.includes("Revisão")) {
        numberOfTimes++;
        if (numberOfTimes >= MEASURED_TIMES_STATUS_CHANGE)
          finalStatus = "Revisão";
        else finalStatus = "Ok";

      } else if (allMeasuredStatus.includes("Atenção"))  {
        numberOfTimes++;
        if (numberOfTimes >= MEASURED_TIMES_STATUS_CHANGE)
          finalStatus = "Atenção";
        else finalStatus = "Ok";

      } else {
        numberOfTimes = 0;
        finalStatus = "Ok"
      }

      await Equipment.update(
        { id: id_equipment },
        { situation: finalStatus }
      )

      return response.status(200).json({ data, finalStatus });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification:
            "Internal server error while trying to register the new data"
        });
    }
  },

  async index(request, response) {
    try {
      const data = await Data.scan().exec();

      return response.status(200).json({ data });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the data",
        });
    }
  },

  async find_id(request, response) {
    try {
      const data = await Data.get(request.params.id);

      return response.status(200).json({ data });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the data",
        });
    }
  },

  async find_id_equipment(request, response) {
    try {
      const { id_equipment } = request.params;
      const data = await Data.scan({ id_equipment: id_equipment }).exec();
      return response.status(200).json({ data });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to find the data",
        });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const { id_equipment, temperature, voltage, current } = request.body;

      const data = await Data.update(
        { id },
        {
          id_equipment,
          temperature,
          voltage,
          current,
        }
      );

      return response.status(200).json({ data });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to update the data",
        });
    }
  },

  async delete(request, response) {
    try {
      const data = await Data.delete(request.params.id);

      return response
        .status(200)
        .json({ notification: "Successfully deleted item" });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to delete the data",
        });
    }
  },

  async connection(request, response) {
    try {
      const { equipment_code } = request.body;

      const equipmentToConnect = await Equipment.scan({ equipment_code: equipment_code }).exec();

      if (!equipmentToConnect.count) {
        return response
          .status(400)
          .json({ notification: "Equipamento não encontrado!" });
      }

      await Equipment.update(
        { id: equipmentToConnect[0].id },
        { flag_connection: "Conectado" }
      )

      return response
        .status(200)
        .json({ notification: "Equipamento conectado com sucesso!" });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to connect to equipment",
        });
    }
  }
};
