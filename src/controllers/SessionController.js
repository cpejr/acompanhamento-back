const FirebaseModel = require('../models/FirebaseModel');
const User = require("../models/userSchema");
const jwt = require('jsonwebtoken');

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

      const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"1d",
      });

      if (user === null || user === undefined) {
        return response.status(403).json({ message: 'User not found' });
      }

      return response.status(200).json({ user, accessToken});
      

    } catch (error) {
      console.warn(error);
      return response.status(500).json({ message: 'Error while trying to validate credentials' })
    }
  },

  // async verifyToken(request, response) {
  //   const authHeader = request.headers.authorization;
  //   const [scheme, token] = authHeader
  //   ? authHeader.split(" ")
  //   : [undefined, undefined];

  //   if (!token || token === null)
  //   return response.status(401).json({ error: "No token provided" });

  //   if (!/^Bearer$/i.test(scheme))
  //   return response.status(401).json({ error: "Token badformatted" });

  //   const verify = await new Promise((res) => {
  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
  //       if (err) return res({ verified: false, user: {} });
  //       const userFromDatabase = await User.scan({
  //         firebaseUid: user.user[0].firebaseUid,
  //       }).exec();
  //       return res({ verified: true, user: userFromDatabase });
  //     });
  //   });

  //   if (verify !== undefined) return response.status(200).json({ valid, user } = verify);
  //   return response.status(403).json({ error: "Invalid authorization token" });
  // },

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
