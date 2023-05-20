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

  // const maxSizeOfAvatar = 3145728;
  // if (req.file) {
  //   if (req.file.size > maxSizeOfAvatar) {
  //     return res.status(400).json({ message: "Uploaded file is too big" });
  //   }
  // }

  const hashPassword = await bcrypt.hash(password, 10);

  // const avatarURL = req.file.path;

  const result = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    email: result.email,
    id: result.id,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
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

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { avatarURL } = req.file;

  const maxSizeOfAvatar = 3145728;
  if (req.file) {
    if (req.file.size > maxSizeOfAvatar) {
      return res.status(400).json({ message: "Uploaded file is too big" });
    }
  }

  await User.findByIdAndUpdate(_id, { avatarURL: req.file.path });

  res.json({ avatarURL });
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateUserById: ctrlWrapper(updateUserById),
  refreshToken: ctrlWrapper(refreshToken),
};
