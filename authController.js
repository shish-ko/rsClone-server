const User = require('./models/User');
const bcrypt = require ('bcrypt');

class AuthController {
  async register (req, res) {
    try {
      
      const {username, password} = req.body;
      const candidate = await User.findOne({username})
      if(candidate) {
        return res.send(400).json("Username is exist");
      }
      const hashedPassword = await bcrypt.hash(password, 4);
      const user = new User({username, password: hashedPassword});
      await user.save();
      res.json({message: 'User was added'})
    } catch (e) {
      console.log(e)
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
