const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");

const servicesSidebarSchema = Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    addressUrl: {
        type: String
    },
    imageUrl: {
        type: String
    },
    address: {
        type: String
    },
    workDays: {
        type: Array
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
}, {versionKey: false});

servicesSidebarSchema.post("save", handleMongooseError);

const ServicesSidebar = model("services-sidebars", servicesSidebarSchema);

module.exports = {
    ServicesSidebar,
  };