import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "./awsConfig.js";
import { AWS_BUCKET_NAME } from "./serverConfig.js";

export const s3Uploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        key: function (req, file, cb) {

            if(!file) {
                return cb(new Error("File not found"));
            }

            // Check mimetype for jpeg and png filles only 
            if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" && file.mimetype !== "image/webp") {
                return cb(new Error("File type not supported"));
            }

            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // To make sure that the file name is unique
            cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.mimetype.split('/')[1]); // File name will be fieldname-timestamp-extension
        }
    })
}); // Uploader is a middleware that handles file uploads