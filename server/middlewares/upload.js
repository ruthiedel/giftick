import multer from 'multer';

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'pictures');
  },
  filename: function (req, file, cb) {
    req.body.picture =  file.originalname+"-"+Date.now()+".jpg";
    cb(null, req.body.picture);
    console.log(req.body.picture)
  }
});

// Create an upload instance
const upload = multer({ storage: storage });
export default upload;