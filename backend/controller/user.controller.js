const admin = require("../model/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = async function (req, res, next) {
  const { username, password } = req.body;

  if(!username || !password){
    res.status(404).json({
      success: false,
      message: "enter username or password",
    });
    return
  }

//   try {
    let user = await admin.findOne({
      username: username,
    });

    let isValid =user && bcrypt.compareSync(password, user?.password);

    if (!isValid)
      res.status(404).json({
        success: false,
        message: "invalid username or password",
      });
    else {
      const token = jwt.sign({ id: user._id }, "abc 123 xyz", {
        expiresIn: 500000,
      });
      res.status(200).json({
        success: true,
        name: user.name,
        username: user.username,
        email: user.email,
        token: token,
      });
    }
//   } catch (err) {
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "some err happen",
//       })
//       .end();
//   }
};

const signUp = async function (req, res, next) {
  const { name, username, email, password ,status} = req.body;

  try {
    let user = await admin.create({
      name: name,
      username: username,
      email: email,
      status:status,
      password: bcrypt.hashSync(password, 8),
    });
    res.status(201).json({
      success: true,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "some err happen while creating user",
    });
  }
};

async function changePass(req, res, next) {

  const { newPassword,id } = req.body;

  try{

    await admin.updateOne({_id:id},{
        password:bcrypt.hashSync(newPassword,8)
    })

    res.status(200).json({
        success:true,
        message:"password changed successfully"
    }).end();
        }catch (err) {
            res
            .status(500)
            .json({
                success: false,
                message: "some err 2 happen",
            })
            .end();
    }

}

module.exports = {
  signIn,
  signUp,
  changePass
};
