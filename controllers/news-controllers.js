const { ctrlWrapper } = require("../utils");
const { News } = require("../models/news");

const getAllNews = async (req, res) => {
    const {page: currentPage, search: searchNews} = req.query;
    const limit = "6";
    const skip = (currentPage - 1 ) * limit;
    if(searchNews){
        const data = await News.find({title: {$regex: searchNews, $options: 'i' }}, "", {skip, limit});
        const quantityNews = await News.find({title: {$regex: searchNews, $options: 'i' }});
        const totalNews = String(Object.keys(quantityNews).length);
        const total = totalNews / 6;
        const totalPages = String(Math.round(total));
        res.status(200).json({data, currentPage, limit, totalNews, totalPages})
    }
    else {
        const data = await News.find({}, "", {skip, limit});
        const quantityNews = await News.find();
        const totalNews = String(Object.keys(quantityNews).length);
        const total = totalNews / 6;
        const totalPages = String(Math.round(total));
        res.status(200).json({data, currentPage, limit, totalNews, totalPages})
    };
};

module.exports = {
    getAllNews: ctrlWrapper(getAllNews),
};