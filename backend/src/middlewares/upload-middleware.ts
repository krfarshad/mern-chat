import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { fieldname } = file;
    try {
      const folder = setUploadFolder(fieldname);
      const uploadPath = path.resolve(process.cwd(), `uploads/${folder}`);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    } catch (error) {
      console.error("Error in setting destination folder:", error);
      cb(error as Error, "");
    }
  },
  filename: (req, file, cb) => {
    try {
      const fileName = file.originalname.replace(" ", "");
      cb(null, `mf-${Date.now()}_${fileName.trim()}`);
    } catch (error) {
      console.error("Error in setting file name:", error);
      cb(error as Error, "");
    }
  },
});

export const upload = multer({ storage });

const setUploadFolder = (fileName: string) => {
  let folder;
  switch (fileName) {
    case "avatar":
      folder = "avatar";
      break;
    case "media":
      folder = "media";
      break;
    default:
      folder = "default";
  }
  const uploadPath = path.resolve(process.cwd(), `uploads/${folder}`);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return folder;
};
