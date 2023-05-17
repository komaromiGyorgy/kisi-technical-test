import { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import fs from "fs";
import articles from "./data/articles.json";

export function checkFileType(
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
  if (
    limitation !== "ignore" &&
    fs.readdirSync("./src/images").length >= articles.length
  ) {
    return cb(new Error("You have reached the limit of images"));
  }
  cb(null, true);
}
