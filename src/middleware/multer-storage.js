const path = require('path');
const multer = require('multer');
const imagesDir = require('lib/images-dir');
const { nanoid } = require('nanoid');

function createMulterStorage() {
  const store = multer.diskStorage({
    destination: imagesDir,
    filename: (req, file, cb) => {
      const { originalname } = file;
      const ext = path.extname(originalname);
      const name = path.basename(originalname, ext);
      const filename = `${name}_${nanoid(6)}${ext}`;
      cb(null, filename);
    },
  });
  return store;
}

const storage = createMulterStorage();

const multerStorage = multer({ storage });

module.exports = multerStorage;
