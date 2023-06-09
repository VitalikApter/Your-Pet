const { Schema, model } = require("mongoose");
const Joi = require("joi");
const {handleMongooseError} = require("../utils");

const noticeSchema = Schema({
    category: {
        type: String,
        enum: ["sell", "lost-found", "for-free"],
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
    price: {
      type: String,
      default: "",
    },
    ownerNotice: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    noticeAvatar: {
      type: String,
      required: true,
    },
}, {versionKey: false});

noticeSchema.post("save", handleMongooseError);

const addNoticeValidation = Joi.object({
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
    price: Joi.string(),
});

const Notice = model("notices", noticeSchema);

module.exports = {
    Notice,
    addNoticeValidation,
  };