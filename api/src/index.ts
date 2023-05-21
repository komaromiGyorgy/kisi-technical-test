import express from "express";
import imageRouter from "./routes/articles/article-router";
import error from "./middleware/error";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here!!");
  res.status(200).send("pong");
});

app.use("/images", imageRouter);

app.use(error);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
