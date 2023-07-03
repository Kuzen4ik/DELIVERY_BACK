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

const isUUIDFormatValid = (id) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(id);
};

module.exports = { saveImage, isUUIDFormatValid };
