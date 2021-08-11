const FirebaseModel = require('../models/FirebaseModel');
const User = require("../models/userSchema");
const jwt = require('jsonwebtoken');


function createJWTtoken(user){
  const payload = {
    id: user.id,
    type: user.type
  };
  const accessToken = jwt.sign({payload}, process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:"1d",
  });
  return accessToken;
}

module.exports = {
  async signin(request, response) {

    try {

      const { email, password } = request.body;
      let firebaseUid;

      try {
        firebaseUid = await FirebaseModel.login(email, password);
      } catch (error) {
        return response.status(400).json({ message: 'Invalid credentials' });
      }

      const user = await User.scan({
        firebaseUid: firebaseUid,
      }).exec();

      const accessToken = createJWTtoken(req.user);

      if (user === null || user === undefined) {
        return response.status(403).json({ message: 'User not found' });
      }

      return response.status(200).json({ user, accessToken});
      

    } catch (error) {
      console.warn(error);
      return response.status(500).json({ message: 'Error while trying to validate credentials' })
    }
  },

  async resetPassword(request, response){
    const { email } = request.body;

    try {
      await FirebaseModel.passwordReset(email);
      return response.status(200).json();
    } catch(error) {
      console.warn(error);
      return response.status(500).json({ error: "Error while trying to send password reset email"})
    }
  }
}
