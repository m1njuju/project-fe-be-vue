var express = require('express');
const multer = require('multer');
var router = express.Router();
const imageSavePath = 'public/images/';

const storage = multer.diskStorage({
    //파일 저장 경로
    destination(req, file, callback) {
        callback(null, imageSavePath)
    },
    //저장되는 파일이름 형식 커스텀 가능
    filename(req, file, callback) {
        callback(null, file.originalname)
    }
});
const upload = multer({storage : storage});

router.post('/',upload.single('upLoadImage'), async function(req, res, next) {
  console.log(req.file);//파일정보
  res.send(req.file);
});

module.exports = router;