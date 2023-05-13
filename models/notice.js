const { Schema, model } = require("mongoose");
const Joi = require("joi");
const {handleMongooseError} = require("../utils");

const noticeSchema = Schema({
    category: {
        type: String,
        enum: ["sell", "lost/found", "in good hands"],
        required: true,
    },
    title: {
      type: String,
      required: true,
    },
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
    sex: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    location: {
        type: String,
        required: true,
    },
    comments: {
      type: String,
      default: "",
    },
}, {versionKey: false});

noticeSchema.post("save", handleMongooseError);

const addNotice = Joi.object({
    category: Joi.string().required().messages({
        "any.required": "missing required field - Category",
    }),
    title: Joi.string().required().messages({
        "any.required": "missing required field - Title",
    }),
    namePet: Joi.string().required().messages({
      "any.required": "missing required field - Name Pet",
    }),
    dateOfBirth: Joi.string().required().messages({
      "any.required": "missing required field - Date of Birth",
    }),
    breed: Joi.string().required().messages({
      "any.required": "missing required field - Breed",
    }),
    sex: Joi.string().required().messages({
        "any.required": "missing required field - Sex",
    }),
    location: Joi.string().required().messages({
        "any.required": "missing required field - Location",
    }),
    comments: Joi.string(),
});


const NoticeSchemas = {
    addNotice,
};

const Notice = model("notices", noticeSchema);

module.exports = {
    Notice,
    NoticeSchemas,
  };