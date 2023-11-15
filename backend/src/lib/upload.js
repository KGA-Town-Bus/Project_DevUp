const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      // done(null, "./uploads");
      done(null, "./backend/uploads");
    },
    filename: (req, file, done) => {

      const ext = path.extname(file.originalname);
      let filename = path.basename(file.originalname, ext) + "_" + Date.now() + ext;

      done(null, filename);
    },
  }),
});

module.exports = upload;