const { Segments, Joi } = require("celebrate");

let userValidate = new Object();

userValidate.create = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    birthdate: Joi.string().required(),
    type: Joi.string().valid("PJ", "PF", "Funcionario").required(),

    active: Joi.string().optional(),
    cpf: Joi.string().optional(),
    cnpj: Joi.string().optional(),
    phonenumber: Joi.string().optional(),
    corporate_name: Joi.string().optional().allow("", null),
    state_registration: Joi.string().optional().allow("", null),
    id_equipments: Joi.array().optional()
  }),
};

userValidate.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    birthdate: Joi.string().optional(),
    phonenumber: Joi.string().optional(),
    active: Joi.string().optional(),
    cpf: Joi.string().optional(),
    cnpj: Joi.string().optional(),
    id_equipments: Joi.array().optional()
  }),
};

userValidate.deleteById = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

userValidate.updatePassword = {
  [Segments.PARAMS]: Joi.object().keys({
    firebaseUid:  Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().min(6).required()
  })
}

module.exports = userValidate;
