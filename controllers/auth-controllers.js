const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { ctrlWrapper } = require("../utils");
const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new HttpError(400, "Email and password are required");
  }
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({...req.body, password: hashPassword });
  const payload = {
    id: result.id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const updatedToken = await User.findByIdAndUpdate(payload.id, { token: token });
  const updatedUser = await User.findById(payload.id);
  res.status(201).json({email: updatedUser.email, token: updatedUser.token});
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email });
  if (!result) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, result.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: result._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const updatedUser = await User.findByIdAndUpdate(result._id, { token });
  const user = await User.findById(result._id);
  res.status(200).json({token, user});
};

const refreshToken = async (req, res) => {
  const user = req.user;
  const userInfo = await User.find({ _id: user });

  if (!userInfo) {
    throw HttpError(404, "Not found");
  }

  const payload = {
    id: user._id,
  };

  const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "720h" });

  res.json({
    refreshToken,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Logout success",
  });
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const maxSizeOfAvatar = 3145728;
  if (req.file) {
    if (req.file.size > maxSizeOfAvatar) {
      return res.status(400).json({ message: "Uploaded file is too big" });
    }
    await User.findByIdAndUpdate(_id, { avatarURL: req.file.path });
    const result = await User.findById(_id);
    return res.status(201).json(result);
  }
  else if (!req.file) {
    return res.status(400).json({ message: "Cannot find a file to upload" });
  }
};

const getCurrent = async (req, res) => {
  const user = req.user;
  res.status(200).json({user})
};

const getUserById = async (req, res) => {
  const {id} = req.params;
  const result = await User.findById(id);
  if(!result){
    throw HttpError(404, `Not found`);
  }
  const email = result.email;
  const phone = result.Phone;
  res.status(200).json({email, phone});
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateUserById: ctrlWrapper(updateUserById),
  refreshToken: ctrlWrapper(refreshToken),
  getCurrent: ctrlWrapper(getCurrent),
  getUserById: ctrlWrapper(getUserById),
};