const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");
const { News } = require("../models/news");

const getAllNews = async (req, res) => {
    const {page: currentPage} = req.query;
    const limit = "6";
    const skip = (currentPage - 1 ) * limit;
    const data = await News.find({}, "", {skip, limit});
    const quantityNews = await News.find();
    const totalNews = Object.keys(quantityNews).length;
    const total = totalNews / 6;
    const totalPages = Math.round(total)
    if(JSON.stringify(data) === "[]") {
        throw HttpError(404, "Not found");
    }
    res.status(200).json({data, currentPage, limit, totalNews, totalPages})
};

module.exports = {
    getAllNews: ctrlWrapper(getAllNews),
};