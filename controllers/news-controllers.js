const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");
const { News } = require("../models/news");

const getAllNews = async (req, res) => {
    const {page} = req.query;
    const limit = 6;
    const skip = (page - 1 ) * limit;
    const result = await News.find({}, "", {skip, limit});
    if(JSON.stringify(result) === "[]") {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(result)
};

module.exports = {
    getAllNews: ctrlWrapper(getAllNews),
};