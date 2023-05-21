import { Router } from "express";
import articleController from "./article-controller";
import express from "express";
import path from "path";
import { upload } from "../../utils";

const router = Router();

router.get("/", articleController.getAll);

router.post("/", upload.single("file"), articleController.create);

router.use(express.static(path.join(__dirname, "../../images")));

export default router;
