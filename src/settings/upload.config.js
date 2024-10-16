import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

//storage
const storage = multer.diskStorage({
    destination: (_req,_file, cb) =>{
        cb(null, "src/uploads/")
    },
    filename: (req, file, cb) => {
        const fileName = crypto.randomUUID().toString() + path.extname(file.originalname);

        cb(null, fileName);
    }
})

//limits
const maxMb = 20
const limits = {fileSize: 1024 * 1024 * maxMb};

//filters
const fileFilter = (_req, file, cb) => {
    //jpeg, jpg, png, gif, webp
    const fileTypes = /jpeg|jpg|png|gif|webp/;

    const allowExtname = fileTypes.test(path.extname(file.originalname));

    if (!allowExtname) {
        return cb(new Error("solo se permiten imagenes (jpeg, jpg, png, gif, webp"));
    }

    return cb(null, true)
};

export const upload = multer({
    storage,
    fileFilter,
    limits,
});