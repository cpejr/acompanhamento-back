const Data = require("../models/dataSchema");
const uuid = require("uuid");
// const { isAfter } = require("date-fns");

module.exports = {
  async create(request, response) {
    try {
      const { id_equipment, temperature, voltage, current } = request.body;
      const id = uuid.v1();
      const data = await Data.create({
        id,
        id_equipment,
        temperature,
        voltage,
        current,
      });

      return response.status(200).json({ data });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({
          notification:
            "Internal server error while trying to register the new data",
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

  // async find_id_equipment_date(request, response) {
  //   try {
  //     const { id_equipment } = request.params;
  //     const minDate = new Date(request.body.minDate);
  //     const numOfElements = request.body.numOfElements;
  //
  //     let data = await Data
  //       .scan({ id_equipment: { eq: id_equipment } })
  //       .exec()
  //
  //     data = data
  //       .filter(data => isAfter(data.createdAt, minDate))
  //       .sort((a, b) => {
  //         if (a.createdAt > b.createdAt) {
  //           return 1;
  //         }
  //         if (a.createdAt < b.createdAt) {
  //           return -1;
  //         }
  //         return 0;
  //       });
  //
  //     const tamanho = data.length;
  //     const steps = data.length > numOfElements ? Math.floor(data.length / numOfElements) : 1;
  //     let i = 0;
  //     data = data
  //       .filter((data, index) => {
  //         if (index % steps === 0 && i < numOfElements) {
  //           i++;
  //           return true;
  //         }
  //       });
  //
  //     return response.status(200).json({ data });
  //   } catch (err) {
  //     console.log(err);
  //     return response
  //       .status(500)
  //       .json({
  //         notification: "Internal server error while trying to find the data",
  //       });
  //   }
  // },

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
};
