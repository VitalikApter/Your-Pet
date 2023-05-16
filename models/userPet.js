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
    ownerPet: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    petAvatar: {
      type: String,
    },
}, {versionKey: false});

userPetSchema.post("save", handleMongooseError);

const addUserPetValidation = Joi.object({
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
    file: Joi.object(),
});


const UserPet = model("user-pets", userPetSchema);

module.exports = {
    UserPet,
    addUserPetValidation,
  };
  