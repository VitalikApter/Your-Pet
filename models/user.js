const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const userSchema = new Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  Birthday: {
    type: String,
    default: "00.00.0000",
  },
  Phone: {
    type: String,
    default: "380000000"
  },
  City: {
    type: String,
  },
  token: {
    type: String,
    default: "",
  },
  avatarURL: {
    type: String,
    default: "",
  },
  favorite: {
    type: Array,
    default: [],
  }
});

const addSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  Birthday: Joi.string(),
  Phone: Joi.string(),
  City: Joi.string(),
  favorite: Joi.boolean(),
});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  addSchema
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
