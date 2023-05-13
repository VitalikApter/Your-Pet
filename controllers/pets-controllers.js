const { ctrlWrapper } = require("../utils");
const { UserPet } = require("../models/userPet");
const { HttpError } = require("../helpers");

const addUserPet = async (req, res) => {
    const {namePet}  = req.body;
    const nameCheck = await UserPet.findOne({namePet});
    if(nameCheck) {
      throw HttpError(409, "This pet allready added");
    }
    else {
    const {_id: ownerPet} = req.user;
    const result = await UserPet.create({...req.body, ownerPet});
    res.status(201).json(result);
    }
};

const deleteUserPet = async (req, res) => {
    console.log(req.user);
    const {_id: ownerPet} = req.user;
    const { _id: userPetId} = req.params;
    const response = await UserPet.findOneAndRemove({userPetId, ownerPet});
    if(response === null){
      throw HttpError(404, "Not found");
    }
    else {
    res.status(200).json({"message": "contact deleted"});
    };
};

module.exports = {
    addUserPet: ctrlWrapper(addUserPet),
    deleteUserPet: ctrlWrapper(deleteUserPet),
  };