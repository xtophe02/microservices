const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const posts = {};
const app = express();

app.use(express.json());
app.use(cors());

app.post("/posts", async (req, res, next) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.get("/posts", (req, res, next) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log(req.body.type);
  res.send({});
});

app.listen(4000, () => console.log("posts listning on 4000"));
