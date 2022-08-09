const fs = require('fs');

const { API_HOST } = process.env;

if (!API_HOST) {
  throw new Error('MISSING_ENVAR');
}

const unlinkFile = path => fs.unlinkSync(path);

exports.uploads = async (req, res) => {
  const { file } = req;
  if (!file) {
    res.status(400).send('No file');
    return;
  }

  const { mimetype, size, path: filePath, filename } = file;

  const imageRegex = /^image\/(.*?)/; // 이미지 형식

  if (!imageRegex.test(mimetype)) {
    unlinkFile(filePath);
    res.status(400).send('Unacceptable file extensions');
    return;
  }

  // 10MB
  if (size > 1024 * 1024 * 10) {
    unlinkFile(filePath);
    res.status(413).send('File capacity is too large');
    return;
  }

  const fileAddress = `${API_HOST}/images/${filename}`;

  res.status(201).send({ path: fileAddress });
};
