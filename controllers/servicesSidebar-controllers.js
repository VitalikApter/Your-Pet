const { ctrlWrapper } = require("../utils");
const { HttpError } = require("../helpers");
const { ServicesSidebar } = require("../models/servicesSidebar");

const getAllServices = async (req, res) => {
    const result = await ServicesSidebar.find();
    if(JSON.stringify(result) === "[]") {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(result)
};

module.exports = {
    getAllServices: ctrlWrapper(getAllServices),
};