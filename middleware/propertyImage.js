const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require("path")
// console.log(path.join(__dirname , '../public/Image'));
// Create multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder where the files will be stored
        // const uploadPath = path.join(__dirname , '../public/Image');
        // console.log("🚀 ~ file: propertyImage.js:12 ~ uploadPath:", uploadPath)
        // if (!fs.existsSync(uploadPath)) {
        //     fs.mkdirSync(uploadPath);
        // }
        // cb(null, uploadPath);

        cb(null, path.join(__dirname, '../public/Image'))
    },
    filename: (req, file, cb) => {
        // Generate a unique filename for each uploaded file
        // const extension = file.originalname.split('.').pop();
        // // console.log("🚀 ~ file: propertyImage.js:20 ~ extension:", extension)
        // const filename = `${uuidv4()}.${extension}`;
        // // console.log("🚀 ~ file: propertyImage.js:23 ~ filename:", filename)
        // cb(null, filename);

        cb(null, uuidv4() + '-' + file.originalname)
    }
});

const propertyImgs = multer({ storage });

module.exports = propertyImgs