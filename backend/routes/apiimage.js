var express = require('express');
const multer = require('multer');
var router = express.Router();
const fs = require('fs');

const storage = multer.diskStorage({
    //파일 저장 경로
    destination(req, file, callback) {
        callback(null, 'uploads/')
    },
    //저장되는 파일이름 형식 커스텀 가능
    filename(req, file, callback) {
        callback(null, file.originalname)
    }
});
const upload = multer({ storage : storage });

router.post('/',upload.array('upLoadImage'), function(req, res, next) {
    /*let i, newname;
    db.content.findOne({
        limit: 1,
        order: [['id', 'DESC']],
        raw: true,
    }).then(result => {
        newname = result.id;
        for( i=0; i<req.files.length; i++) {
            fs.renameSync(req.files[i].path, 'image/'+(newname+1)+'-'+(i+1)+'.png');
        }
        return res.status(200).json({message: '이미지업로드완료!'});
    })*/

    console.log(req.file);//파일정보
    res.send(req.file);
});

module.exports = router;