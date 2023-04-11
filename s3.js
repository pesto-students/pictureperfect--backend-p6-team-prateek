require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const uploadImage = async (url, name) => {
  //const image = dataURItoBlob(file);
  const base64Data = new Buffer.from(
    url.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const userId = Date.now();
  const type = url.split(";")[0].split("/")[1];
  const uploadParams = {
    Bucket: bucketName,
    Body: base64Data,
    Key: `${name}.${type}`,
    ContentType: "image/jpeg",
  };

  return await s3.upload(uploadParams).promise();
};
// ContentType: "image/jpeg",
var atob = require("atob");
function dataURItoBlob(dataURI) {
  var binary = atob(dataURI.split(",")[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
}
module.exports = { uploadImage };
