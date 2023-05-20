import Users from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const register = async (req, res) => {
  try {
    const dataGet = await Users.find({
      username: req.body.username,
    });

    if (dataGet.length) {
      return res.status(409).json("User already exist");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt); 

      const dataPost = new Users({
        id : uuidv4(),
        fullname: req.body.fullname,
        username: req.body.username,
        dob: req.body.dob,
        password: hash       
      });

      try {
        const dataToSave = await dataPost.save();

        return res.status(200).json(dataToSave);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const dataGet = await Users.find({
      username: req.body.username,
    });

    if (dataGet.length == 0) 
    {
      console.log("lENGHT")
      return res.status(500).json("User not found");
    }
   
    // check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      dataGet[0].password
    );
   
    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: dataGet[0].id }, "jwtkey");

    const { password, ...other } = dataGet[0];

    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(dataGet[0]);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};

export { register, login, logout };

