import express from "express";
import * as imageService from "../services/imageService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(imageService.getEntries());
});

export default router;
