var express = require("express");
var router = express.Router();
const multer = require("multer");
const memos = require("../memo.json");

router.use("/uploadImg", express.static("media"));

const storage = multer.diskStorage({
  //파일 저장 경로
  destination(req, file, callback) {
    callback(null, "media/");
  },
  //저장되는 파일이름 형식 커스텀 가능
  filename(req, file, callback) {
    console.log(file);
    const fileName = `${Date.now()}_${req.params.id}.jpg`;
    callback(null, fileName);
  },
});

const upload = multer({ storage: storage }).single("inputImage");

router.post("/upload/:id", upload, function (req, res, next) {
  console.log(req.body);
  console.log(req.file.filename);
  res.send();
});

module.exports = router;
