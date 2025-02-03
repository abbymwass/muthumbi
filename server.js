const express= require("express");
const bodyParser =require("body-parser");
const nodemailer= require("nodemailer");
const cors = require("cors");

const app =express();
const PORT =5000;

//Middleware
app.use(cors());
app.use(bodyParser.json());
app