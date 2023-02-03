const { json } = require('express');
const express = require('express');
const mongoose = require ('mongoose');

const authRouter = require('./authRouter');
const PORT = 3000;


const app = express();
app.use(json());
app.use("/auth", authRouter);
app.listen(PORT, async()=>{
  try {
    await mongoose.connect('mongodb+srv://geogesser:geogesser123@geogesser.q6pf4bj.mongodb.net/?retryWrites=true&w=majority');
    console.log(`server started on port ${PORT}`);
  } catch (e) {
    console.log(`Server failed with error ${e}`);
  }
})

