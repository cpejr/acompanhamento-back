const { Segments, Joi } = require('celebrate');

let modelValidate = new Object();

modelValidate.createModel = {
  [Segments.BODY]: Joi.object().keys({
    modelName: Joi.string().required(),
    type: Joi.string().required(),
    manufacturer: Joi.string().required(),
    releaseYear: Joi.string().required(),
    min_temp: Joi.number().required(),
    max_temp: Joi.number().required(),
    min_current: Joi.number().required(),
    max_current: Joi.number().required(),
    min_voltage: Joi.number().required(),
    max_voltage: Joi.number().required(),
    min_vibra: Joi.number().required(),
    max_vibra: Joi.number().required(),
  }),
    [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
}

modelValidate.getId = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
}

modelValidate.getModel = {
  [Segments.PARAMS]: Joi.object().keys({
    model: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
}

modelValidate.findManufacturer = {
  [Segments.PARAMS]: Joi.object().keys({
    manufacturer: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
}

modelValidate.updateModel = {
  [Segments.BODY]: Joi.object().keys({
    modelName: Joi.string(),
    type: Joi.string(),
    manufacturer: Joi.string(),
    releaseYear: Joi.string(),
    min_temp: Joi.number(),
    max_temp: Joi.number(),
    min_current: Joi.number(),
    max_current: Joi.number(),
    min_voltage: Joi.number(),
    max_voltage: Joi.number(),
    min_vibra: Joi.number(),
    max_vibra: Joi.number(),
  }),
  [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
}

modelValidate.deleteModel = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required(),
  })
  .unknown(),
}



module.exports = modelValidate;  