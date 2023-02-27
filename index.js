const { json } = require('express');
const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./auth/authRouter');
const scoreRouter = require('./score/scoreRouter');
const customRouter = require('./custom_games/customRouter');
const bestScoreRouter = require('./score/bestScoreRouter');
const PORT = 4000;


const app = express();
app.use(json());
app.use(cors({origin: ["http://localhost:3000", "https://arturzabashta-jsfe2022q3-pointer.netlify.app"]}));
app.use("/auth", authRouter);
app.use("/score", scoreRouter);
app.use("/custom", customRouter);
app.use("/best_score", bestScoreRouter);
const { DB_PASSWORD } = process.env

app.listen(PORT, async()=>{
  try {
    await mongoose.connect(DB_PASSWORD);
    console.log(`server started on port ${PORT}`);
  } catch (e) {
    console.log(`Server failed with error ${e}`);
  }
})

