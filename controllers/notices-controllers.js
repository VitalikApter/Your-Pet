const { ctrlWrapper } = require("../utils");
const { Notice } = require("../models/notice");
const { HttpError } = require("../helpers");

const addNotice = async (req, res) => {
    const {title}  = req.body;
    const nameCheck = await Notice.findOne({title: title});
    if(nameCheck) {
      throw HttpError(409, "This title already added");
    }
    else {
    const result = await Notice.create({...req.body});
    res.status(201).json(result);
    }
};

const getNoticesByCategory = async (req, res) => {
    // %20
    // %2F
    const { category: categoryNotice } = req.query;
    const result = await Notice.find({category: categoryNotice});
    if (JSON.stringify(result) === "[]") {
      throw HttpError(404, "Not Found");
    }
    else{
      res.status(200).json(result);
    }
};

const getNoticesByTitle = async (req, res) => {
    const { title: titleNotice } = req.query;
    const result = await Notice.find({title: titleNotice})
    if (JSON.stringify(result) === "[]") {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(result);
};

const getNoticeById = async (req, res) => {
    const {id: idNotice} = req.params;
    const result = await Notice.findById(idNotice)
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
};

const getNoticesByUser = async (req, res) => {
    
};

module.exports = {
    addNotice: ctrlWrapper(addNotice),
    getNoticesByCategory: ctrlWrapper(getNoticesByCategory),
    getNoticesByTitle: ctrlWrapper(getNoticesByTitle),
    getNoticeById: ctrlWrapper(getNoticeById),
    getNoticesByUser: ctrlWrapper(getNoticesByUser),
  };