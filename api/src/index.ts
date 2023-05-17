import express from "express"; // ESModules

import imageRouter from "./routes/images";

const app = express();
app.use(express.json()); // middleware que transforma la req.body a un json

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here!!");
  res.send("pong");
});

app.use("/images", imageRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
