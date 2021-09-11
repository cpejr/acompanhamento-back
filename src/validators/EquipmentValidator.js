const { Segments, Joi } = require("celebrate");

let equipmentValidate = new Object();

equipmentValidate.create = {
  [Segments.BODY]: Joi.object().keys({
    equipment_code: Joi.string().required(),
    id_model: Joi.string().required(),
    installation_date: Joi.string().required(),
    situation: Joi.string().required().valid("Ok", "Atenção", "Revisão"),
    initial_work: Joi.string().required(),
    maintenance: Joi.string().optional(),
    address: Joi.string().optional().allow("", null),
    zipcode: Joi.string().optional().allow("", null),
    last_visit: Joi.string().optional().allow("", null),
    flag_connection: Joi.string().optional().allow("", null),
    observation: Joi.string().optional().allow("", null),
    cpfcnpj: Joi.string().optional().allow("", null),
    phone_number: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object()
  .keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
}

equipmentValidate.getEquipmentById = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object()
  .keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
};

equipmentValidate.getEquipmentByModel = {
  [Segments.PARAMS]: Joi.object().keys({
    id_model: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object()
  .keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
};

equipmentValidate.getEquipmentBySituation = {
  [Segments.PARAMS]: Joi.object().keys({
    situation: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object()
  .keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
};

equipmentValidate.getEquipmentByCPF = {
  [Segments.PARAMS]: Joi.object().keys({
    cpf_client: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object()
  .keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
};
equipmentValidate.getEquipmentByMaintence ={
  [Segments.PARAMS]: Joi.object().keys({
    maintenance: Joi.string().required(),
  }),
};

equipmentValidate.updateEquipment = {
  [Segments.BODY]: Joi.object().keys({
    equipment_code: Joi.string().optional(),
    id_model: Joi.string().optional(),
    installation_date: Joi.string().optional(),
    situation: Joi.string().optional(),
    initial_work: Joi.string().optional(),
    maintenance: Joi.string().optional(),
    address: Joi.string().optional().allow("", null),
    zipcode:Joi.string().optional().allow("", null),
    last_visit:Joi.string().optional(),
    flag_connection: Joi.string().optional().allow("", null),
    observation: Joi.string().optional().allow("", null),
    cpfcnpj: Joi.string().optional().allow("", null),
    phone_number: Joi.string().optional(),
  }),
  [Segments.HEADERS]: Joi.object()
  .keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
}

equipmentValidate.deleteEquipment = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object()
  .keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
};

equipmentValidate.equipmentWorkTime = {
  [Segments.BODY]: Joi.object().keys({
    id_equipment: Joi.string().required(),
    worktime: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object()
  .keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
};

module.exports = equipmentValidate;
