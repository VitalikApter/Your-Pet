const { Schema, model } = require("mongoose");
const Joi = require("joi");
const {handleMongooseError} = require("../utils");


const userPetSchema = Schema({
    namePet: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["your pet"],
      required: true,
    },
    comments: {
      type: String,
      default: "",
    },
}, {versionKey: false});

userPetSchema.post("save", handleMongooseError);

const addUserPet = Joi.object({
    namePet: Joi.string().required().messages({
      "any.required": "missing required field - Name Pet",
    }),
    dateOfBirth: Joi.string().required().messages({
      "any.required": "missing required field - Date of Birth",
    }),
    breed: Joi.string().required().messages({
      "any.required": "missing required field - Breed",
    }),
    category: Joi.string().required().messages({
      "any.required": "missing required field - Category", 
    }),
    comments: Joi.string(),
});

const UserPetSchemas = {
    addUserPet,
  };

const UserPet = model("user-pets", userPetSchema);

module.exports = {
    UserPet,
    UserPetSchemas,
  };
  