import express from "express"; // ESModules

import imageRouter from "./routes/images";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here!!");
  res.send("pong");
});

app.use("/images", imageRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
