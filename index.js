const { json } = require('express');
const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors')

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
app.listen(PORT, async()=>{
  try {
    await mongoose.connect('mongodb+srv://geogesser:geogesser123@geogesser.q6pf4bj.mongodb.net/?retryWrites=true&w=majority');
    console.log(`server started on port ${PORT}`);
  } catch (e) {
    console.log(`Server failed with error ${e}`);
  }
})

