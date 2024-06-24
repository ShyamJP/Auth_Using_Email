const User = require("../models/user");

const register = async (req, res) => {
    const user = new User(req.body);
    try {
        await user
          .save()
          .then((res) => res.status(200).json({message:"registered successfully.." , data: res}))
          .catch((err) => res.json({message:err}));
      } catch (err) {
        console.log(err);
      }
    // const { name ,email, password } = req.body;
    // const getuser = await User.findOne({ email: email });
    // if (getuser) {
    //   if (getuser.password === password) {
    //     res.json({ message: "user Loged in", data: getuser });
    //   } else {
    //     res.json({ message: "User not Exist" }).status(404);
    //   }
    // }
  };

  module.exports = register;