const { Router } = require("express");
const routes = Router();
const { celebrate, Segments, Joi } = require("celebrate");

const UserController = require("./controllers/UserController");
const userValidate = require("./validators/UserValidator");

const SessionController = require("./controllers/SessionController");
const loginValidate = require("./validators/LoginValidator");

const DataController = require("./controllers/DataController");

const ModelController = require("./controllers/ModelController");
const modelValidate = require("./validators/ModelValidator");

const EquipmentController = require("./controllers/EquipmentController");
const equipmentValidate = require("./validators/EquipmentValidator");

const authBySession = require("./middlewares/authenticationBySession");
const authEmployee = require("./middlewares/authenticationEmployee");
// Login
routes.post(
  "/login",
  celebrate(loginValidate.signin),
  SessionController.signin
);
routes.post("/reset", SessionController.resetPassword);

// Users
routes.post(
  "/user/create",
  celebrate(userValidate.create),
  authEmployee.authenticateToken,
  UserController.create
);
routes.get("/user", authEmployee.authenticateToken, UserController.index);
routes.get("/user/:id", authBySession.authenticateToken, UserController.find);
routes.put("/user/:id", authBySession.authenticateToken, UserController.update);
routes.delete(
  "/user/:id",
  celebrate(userValidate.deleteById),
  authEmployee.authenticateToken,
  UserController.deleteById
);

// Firebase
routes.put("/user/updateFirebase/:uid", authBySession.authenticateToken, UserController.updateFirebase);
routes.get("/user/getFirebase/:firebaseUid", UserController.getFirebase);
routes.get("/user/firebase/:firebaseUid", UserController.findByFirebase);

// Data
routes.get("/data/index", DataController.index);
routes.get("/data/:id", DataController.find_id);
routes.put("/data/:id", DataController.update);
routes.delete("/data/:id", DataController.delete);
routes.get("/data/equipment/:id_equipment", DataController.find_id_equipment);
routes.post("/data-equipment/create", DataController.create);
routes.post("/data/connection", DataController.connection);

// Models
routes.post(
  "/model/create",
  celebrate(modelValidate.createModel),
  authEmployee.authenticateToken,
  ModelController.create
);
routes.get("/model/index",
  authBySession.authenticateToken,
  ModelController.index
);
routes.get(
  "/model/:id",
  celebrate(modelValidate.getId),
  authBySession.authenticateToken,
  ModelController.find_id
);
routes.put(
  "/model/:id",
  celebrate(modelValidate.updateModel),
  authEmployee.authenticateToken,
  ModelController.update
);
routes.delete(
  "/model/:id",
  celebrate(modelValidate.deleteModel),
  authEmployee.authenticateToken,
  ModelController.delete
);

// Equipment
routes.post(
  "/equipment/create",
  celebrate(equipmentValidate.create),
  authEmployee.authenticateToken,
  EquipmentController.create
);
routes.get("/equipment/index",
  authBySession.authenticateToken,
  EquipmentController.index);
routes.get(
  "/equipment/:id",
  celebrate(equipmentValidate.getEquipmentById),
  authBySession.authenticateToken,
  EquipmentController.find_id
);
routes.get(
  "/equipment/find_situation/:situation",
  celebrate(equipmentValidate.getEquipmentBySituation),
  authBySession.authenticateToken,
  EquipmentController.find_situation
);
routes.put(
  "/equipment/:id",
  celebrate(equipmentValidate.updateEquipment),
  authBySession.authenticateToken,
  EquipmentController.update
);
routes.delete(
  "/equipment/:id",
  celebrate(equipmentValidate.deleteEquipment),
  authEmployee.authenticateToken,
  EquipmentController.delete
);
routes.put(
  "/set_time/:id",
  authEmployee.authenticateToken,
  EquipmentController.set_usage_time
);

module.exports = routes;
