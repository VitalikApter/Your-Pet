const { ctrlWrapper } = require("../utils");
const { UserPet } = require("../models/userPet");
const { HttpError } = require("../helpers");
const { addUserPetValidation } = require("../models/userPet");

const addUserPet = async (req, res) => {
    const {error} = addUserPetValidation.validate(req.body);
    if(error) {
      return res.status(400).json({"message": error.message});
    };  
    const maxSizeOfAvatar = 3145728;
    if(req.file){
      if(req.file.size > maxSizeOfAvatar){
        return res.status(400).json({"message": "Uploaded file is too big"});
      }
      const {namePet}  = req.body;
      const nameCheck = await UserPet.findOne({namePet});
      if(nameCheck) {
        throw HttpError(409, "This pet allready added");
      }
      else {
      const {_id: ownerPet} = req.user;
      const result = await UserPet.create({...req.body, ownerPet, petAvatar: req.file.path});
      res.status(201).json(result);
      }
    }
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

// Test
const getAllUserPets = async (req, res) => {
  const result = await UserPet.find({category: "your pet"})
  if(!result){
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result)
};

module.exports = {
    addUserPet: ctrlWrapper(addUserPet),
    deleteUserPet: ctrlWrapper(deleteUserPet),
    getAllUserPets: ctrlWrapper(getAllUserPets),
};