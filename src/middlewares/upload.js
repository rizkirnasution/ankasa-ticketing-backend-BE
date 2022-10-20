// const path = require("path");
// const multer = require("multer");
// const crypto = require("crypto");
// const { failed } = require("../utils/createResponse");

// // management file
// const multerUpload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       if (file.fieldname === "image") {
//         cb(null, "./public/photo");
//       }
//     },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       const filename = `${Date.now()}${ext}`;
//       cb(null, filename);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     if (file.fieldname === "image") {
//       // filter mimetype
//       if (
//         file.mimetype === "image/png" ||
//         file.mimetype === "image/jpg" ||
//         file.mimetype === "image/jpeg"
//       ) {
//         cb(null, true);
//       } else {
//         cb(
//           { message: "Photo extension only can .jpg, .jpeg, and .png" },
//           false
//         );
//       }
//     }
//   },
// });

// // middleware
// module.exports = (req, res, next) => {
//   const multerFields = multerUpload.fields([
//     {
//       name: "image",
//       maxCount: 1,
//     },
//   ]);
//   multerFields(req, res, (err) => {
//     if (err) {
//       let errorMessage = err.message;
//       if (err.code === "LIMIT_FILE_SIZE") {
//         errorMessage = `File ${err.field} too large, max 50mb`;
//       }

//       failed(res, {
//         code: 400,
//         payload: errorMessage,
//         message: "Upload File Error",
//       });
//     } else {
//       next();
//     }
//   });
// };


const multer = require("multer");
const path = require("path");
const { failed } = require("../utils/createResponse");

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === ".jpg" || ext === ".png") {
      cb(null, true);
    } else {
      const error = {
        message: "file must be jpg or png",
      };
      cb(error, false);
    }
  },
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 10,
  },
});

const upload = (req, res, next) => {
  const multerSingle = multerUpload.single("image");
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, {
        code: 400,
        payload: err.message,
        message: "Bad Request",
      });
    } else {
      next();
    }
  });
};

module.exports = upload;
