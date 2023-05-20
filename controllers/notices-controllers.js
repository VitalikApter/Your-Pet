const { ctrlWrapper } = require("../utils");
const { Notice } = require("../models/notice");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const { addNoticeValidation } = require("../models/notice");

const addNotice = async (req, res) => {
    const {error} = addNoticeValidation.validate(req.body);
    if(error) {
      return res.status(400).json({"message": error.message});
    };
    const maxSizeOfAvatar = 3145728;
    if(req.file){
      if(req.file.size > maxSizeOfAvatar){
        return res.status(400).json({"message": "Uploaded file is too big"});
      }
      const {title}  = req.body;
      const nameCheck = await Notice.findOne({title: title});
      if(nameCheck) {
        throw HttpError(409, "This title is already added");
      }
      else {
      const {_id: ownerNotice} = req.user;
      await Notice.create({...req.body, ownerNotice, noticeAvatar: req.file.path});
      const result = Notice.findById(ownerNotice);
      res.status(201).json(result);
      }
    }
    const {title}  = req.body;
    const nameCheck = await Notice.findOne({title: title});
    if(nameCheck) {
      throw HttpError(409, "This title is already added");
    }
    else {
    const {_id: ownerNotice} = req.user;
    const result = await Notice.create({...req.body, ownerNotice});
    res.status(201).json(result);
    }
};

const getNoticeById = async (req, res) => {
  const {id: idNotice} = req.params;
  const result = await Notice.findById(idNotice)
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const getNoticesСreatedByUser = async (req, res) => {
  const {id: ownerNotice} = req.user;
  const result = await Notice.find({ownerNotice: ownerNotice});
  if (JSON.stringify(result) === "[]") {
    throw HttpError(404, "Not Found");
  }
  else{
    res.status(200).json(result);
  }
};

const deleteNoticeCreatedByUser = async (req, res) => {
  const { id: idNotice} = req.params;
  const { id: ownerNotice} = req.user;
  const response = await Notice.findOneAndRemove({_id: idNotice, ownerNotice: ownerNotice});
  console.log(response);
  if(response === null){
    throw HttpError(404, "Not Found");
  }
  else {
  res.status(200).json({"message": "contact deleted"});
  };
};

const getNoticesBySearchOrCategory = async (req, res) => {
  const { search: titleNotice, category: categoryNotice } = req.query;
  const {page, limit} = req.query;
  const skip = (page - 1 ) * limit; 
  if(titleNotice && !categoryNotice) {
    const result = await Notice.find({ title: { $regex: titleNotice, $options: 'i' }}, "", {skip, limit});
    if(JSON.stringify(result) === "[]") {
    throw HttpError(404, "Not Found");
    }
    res.status(200).json(result);
  }
  else if(categoryNotice && !titleNotice) {
    const result = await Notice.find({category: categoryNotice}, "", {skip, limit});
    if(JSON.stringify(result) === "[]") {
      throw HttpError(404, "Not Found");
      }
      res.status(200).json(result);
  }
  else if(titleNotice && categoryNotice) {
    const result = await Notice.find({category: categoryNotice, title: { $regex: titleNotice, $options: 'i' }}, "", {skip, limit});
    if(JSON.stringify(result) === "[]") {
      throw HttpError(404, "Not Found");
      }
      res.status(200).json(result);
  }
  else if(!titleNotice && !categoryNotice) {
    throw HttpError(404, "Not Found");
  };
};

const addNoticeToFavorite = async (req, res) => {
  const { id: idNotice} = req.params;
  const { _id } = req.user;
  const idNoticeCheck = await Notice.findById(idNotice);
    if (!idNoticeCheck) {
    throw HttpError(404, `Not found`);
  }
  const favoriteCheck = await User.find({_id: _id, favorite: idNotice});
  if(Object.keys(favoriteCheck).length === 0){
    await User.findByIdAndUpdate(_id, {$push: { favorite: idNotice }});
    const result = await User.findById(_id)
    res.status(201).json(result);
  }
  else{
    throw HttpError(409, "This notice is already added to favorite");
  }

};

const getNoticesAddedToFavoriteByUser = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findById({_id});
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json(result.favorite)
};

const deleteNoticeFromFavorite = async (req, res) => {
  const { id: idNotice} = req.params;
  const { _id } = req.user;
  const result = await User.findById({_id});
  const favoriteData = result.favorite;
  if(!favoriteData.includes(idNotice)){
    throw HttpError(404, `Not found`);
  }
  await User.findByIdAndUpdate(_id, {$pull: { favorite: idNotice }});
  const updatedFavoriteData = await User.findById({_id});
  res.status(200).json(updatedFavoriteData)
};

module.exports = {
    addNotice: ctrlWrapper(addNotice),
    getNoticesBySearchOrCategory: ctrlWrapper(getNoticesBySearchOrCategory),
    getNoticeById: ctrlWrapper(getNoticeById),
    getNoticesСreatedByUser: ctrlWrapper(getNoticesСreatedByUser),
    deleteNoticeCreatedByUser: ctrlWrapper(deleteNoticeCreatedByUser),
    addNoticeToFavorite: ctrlWrapper(addNoticeToFavorite),
    getNoticesAddedToFavoriteByUser: ctrlWrapper(getNoticesAddedToFavoriteByUser),
    deleteNoticeFromFavorite: ctrlWrapper(deleteNoticeFromFavorite),
};