import express from "express";

const app = express();

//Routes
app.get("/", (req, res, next) => {
  res.json({
    text: "sometext for now",
  });
});

// app.use();

export default app;
