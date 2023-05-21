import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import fs from "fs/promises";
import articles from "./data/articles.json";
import imageSize from "image-size";
import { promisify } from "util";
import { Meta } from "./types";
const sizeOf = promisify(imageSize);
console.log(path.join(__dirname, "images"));

export const iamgesPath = path.join(__dirname, "images");

export async function getImagesLength() {
  return fs.readdir(iamgesPath).then((results) => results.length);
}

export async function checkFileType(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  const { limitation } = req.query;
  if (
    !path
      .extname(file.originalname)
      .toLowerCase()
      .match(/\.(jpg|jpeg|png|gif)$/)
  ) {
    return cb(new Error("Only image files are allowed (jpg|jpeg|png|gif)"));
  }
  const imageslength = await getImagesLength();

  if (limitation !== "ignore" && imageslength >= articles.length) {
    return cb(new Error("You have reached the limit of images"));
  }
  cb(null, true);
}

export async function getFileSize(url: string) {
  const imageMeta = (await sizeOf(url)) as unknown as Meta;
  return imageMeta;
}

const storage = multer.diskStorage({
  destination: iamgesPath,
  filename: async (_, file, cb) => {
    const extension = path.extname(file.originalname);
    const imageslength = await getImagesLength();
    cb(null, `image${imageslength}${extension}`);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: checkFileType,
});

export function comapreByFileName(a: string, b: string) {
  const fileNameA = a.replace("/", "");
  const fileNameB = b.replace("/", "");
  const numberA = Number(fileNameA.match(/\d+/)?.[0] || 0);
  const numberB = Number(fileNameB.match(/\d+/)?.[0] || 0);
  return numberA - numberB;
}
