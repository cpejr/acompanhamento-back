const { Segments, Joi } = require('celebrate');

let equipmentValidate = new Object();

equipmentValidate.create = {

  [Segments.BODY]: Joi.object().keys({
    equipment_code: Joi.string().required(),
    id_model: Joi.string().required(),
    installation_date: Joi.string().required(),
    situation:Joi.string().required().valid("Ok", "Atenção", "Revisão"),
    initial_work: Joi.string().required(),
    maintenance: Joi.object().optional(),
    address: Joi.string().optional().allow("", null),
    zipcode: Joi.string().optional().allow("", null),
    last_visit: Joi.string().optional().allow("", null),
    flag_connection: Joi.string().optional().allow("", null),
    observation: Joi.string().optional().allow("", null),
  })
}

equipmentValidate.getEquipmentById = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
}

equipmentValidate.getEquipmentByModel = {
  [Segments.PARAMS]: Joi.object().keys({
    id_model: Joi.string().required(),
  })
}

equipmentValidate.getEquipmentBySituation = {
  [Segments.PARAMS]: Joi.object().keys({
    situation: Joi.string().required(),
  })
}

equipmentValidate.getEquipmentByCPF = {
  [Segments.PARAMS]: Joi.object().keys({
    cpf_client: Joi.string().required(),
  })
}

equipmentValidate.updateEquipment = {
  [Segments.BODY]: Joi.object().keys({
    equipment_code: Joi.string().optional(),
    id_model: Joi.string().optional(),
    installation_date: Joi.string().optional(),
    situation:Joi.string().optional(),
    initial_work: Joi.string().optional(),
    maintenance: Joi.object().optional(),
    address: Joi.string().optional().allow("", null),
    zipcode:Joi.string().optional().allow("", null),
    last_visit:Joi.string().optional(),
    flag_connection: Joi.string().optional().allow("", null),
    observation: Joi.string().optional().allow("", null),
  })
}

equipmentValidate.deleteEquipment = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
}

equipmentValidate.equipmentWorkTime = {
  [Segments.BODY]: Joi.object().keys({
    id_equipment: Joi.string().required(), 
    worktime: Joi.number().required(),
  })
}

module.exports = equipmentValidate;  