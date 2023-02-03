const User = require('./models/User')

class AuthController {
  async register (req, res) {
    try {
      res.send('Hello!')
    } catch (e) {

    }
  }

  async login (req, res) {
    try {

    } catch (e) {
      
    }
  }

}
const authController = new AuthController ();
module.exports = authController;
