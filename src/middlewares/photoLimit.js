const { failed } = require("../utils/createResponse");
const deleteFile = require("../utils/deleteFile");

module.exports = (req, res, next) => {
  try {
    if (req.files) {
      if (req.files.image) {
        if (req.files.image[0].size > 2000000) {
          deleteFile(req.files.image[0].path);

          failed(res, {
            code: 400,
            payload: "File photo too large, max 2mb",
            message: "Upload File Error",
          });
          return;
        }
      }
    }

    next();
  } catch (error) {
    failed(res, {
      code: 500,
      payload: error.message,
      message: "Internal Server Error",
    });
  }
};
