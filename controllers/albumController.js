const Album = require("../models/albumModel");
const PhotoStudio = require("../models/photoStudioModel");
const User = require("../models/userModel");
const imagelist = require("../models/imageModel");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadImage } = require("../s3");
let randomString = require("randomstring");

// async function imageUpload(image, albumId) {
//   //   console.log(image.data_url);
//   const uploadedImage = await uploadImage(image.data_url);
//   console.log(uploadedImage.Location);
//   return uploadedImage.Location;
// }
const createAlbum = async (req, res) => {
  const studio_id = req.user._id;
  const studioFromDb = await User.findOne({ _id: studio_id }).populate({
    path: "userData",
    populate: {
      path: "albums",
      populate: {
        path: "images",
      },
    },
  });
  const images = req.body.images;
  const album = new Album({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
  });
  await album
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.send({ meaasge: err.message || "album creation got failed" });
    });

  const id = await Album.findOne({ name: req.body.name });

  const promises = images.map(async (image) => {
    const imageName =
      req.body.name +
      randomString.generate({
        length: 8,
        charset: "alphanumeric",
      });

    const { Location } = await uploadImage(image.data_url, imageName);
    console.log(Location);
    const imglist = new imagelist({
      album: id._id,
      imagesUrl: Location,
    });
    await imglist.save();

    console.log(imglist);

    return imglist;
  });
  const imglists = await Promise.all(promises);

  album.images = album.images.concat(imglists);
  await album.save();

  studioFromDb.userData.albums.push(album);
  console.log(studioFromDb);
  await studioFromDb.userData.save();
  await studioFromDb.save();
};

const albumdetails = async (req, res) => {
  const studio_id = req.user._id;

  const studioFromDb = await User.findOne({ _id: studio_id }).populate({
    path: "userData",
    populate: {
      path: "albums",
      populate: {
        path: "images",
      },
    },
  });

  // const results = await Album.find().populate({
  //   path: "images",
  // });
  console.log(studioFromDb.userData.albums);
  res.status(200).json(studioFromDb.userData.albums);
  // if (results) {
  //   res.status(200).json(results);
  // } else {
  //   res.status(400).send({ message: "searched result not found" });
  // }
};

const albumData = async (req, res) => {
  const id = req.params.id;
  //   res.send({ message: `searched result not found ${_id}` });
  const result = await Album.findById({ _id: id }).populate({
    path: "images",
    populate: {
      path: "albums",
    },
  });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).send({ message: "searched result not found" });
  }
};

const imageData = async (req, res) => {
  const id = req.params.id;
  const result = await imagelist.findById({ _id: id });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).send({ message: "Image not  found" });
  }
};

const deleteAlbum = async (req, res) => {
  const id = req.params.id;
  const result = await Album.deleteOne({ _id: id });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).send({ message: "Image not  found" });
  }
};
module.exports = {
  createAlbum,
  albumdetails,
  albumData,
  imageData,
  deleteAlbum,
};
