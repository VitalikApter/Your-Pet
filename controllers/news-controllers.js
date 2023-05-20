const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");
const { News } = require("../models/news");

const getAllNews = async (req, res) => {
    const result = await News.find();
    if(JSON.stringify(result) === "[]") {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(result)
};

module.exports = {
    getAllNews: ctrlWrapper(getAllNews),
};