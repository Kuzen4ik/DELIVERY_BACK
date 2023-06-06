const path = require("path");

const saveImage = async (image) => {
  try {
    const imageName = Date.now() + "_" + image.name;
    const imagePath = path.resolve("static", imageName);
    image.mv(imagePath);
    return imageName;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { saveImage };
