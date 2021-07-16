const admin = require("firebase-admin");
const firebase = require("firebase/app");
require("dotenv").config();

require("firebase/auth");

var firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDE,
  appID: process.env.FIREBASE_APPID,
};

const serviceAccount = {
  type: process.env.ADMIN_TYPE,
  project_id: process.env.ADMIN_PROJECT_ID,
  private_key_id: process.env.ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.ADMIN_CLIENT_EMAIL,
  client_id: process.env.ADMIN_CLIENT_ID,
  auth_uri: process.env.ADMIN_AUTH_URI,
  token_uri: process.env.ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.ADMIN_CLIENT_X509_CERT_URL,
};

firebase.initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
});

module.exports = {
  async createNewUser(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          resolve(result.user.uid);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  
  async deleteUser(uid) {
    return new Promise((resolve, reject) => {
      admin
        .auth()
        .deleteUser(uid)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          const errorMessage = error.message;
          reject(errorMessage);
        });
    });
  },

  async login(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result.user.uid + "+" + email);
          resolve(result.user.uid);
        })
        .catch((error) => {
          console.log(error);
          const errorMessage = error.message;
          reject(errorMessage);
        });
    });
  },
};
