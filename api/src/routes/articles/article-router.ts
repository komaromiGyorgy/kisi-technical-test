import { Router } from "express";
import multer from "multer";
import articleController from "./article-controller";
import { checkFileType } from "../../utils";
import express from "express";
import path from "path";

const router = Router();
const upload = multer({
  dest: "./src/images/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: checkFileType,
});

router.get("/", articleController.getAll);

router.post("/", upload.single("file"), articleController.create);

router.use(express.static(path.join(__dirname, "../../images")));

export default router;
