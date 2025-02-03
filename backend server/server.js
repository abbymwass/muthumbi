require("dotenv").config();
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const axios = require("axios");
const {ExpressPeerServer}=require("peer");

// const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//set up peerjs for webRTC
const peerServer=ExpressPeerServer(server,{debug:true});
app.use("/peerjs",peerServer);

let clients = new Set();

//Function to get AI response from OpenAI
async function getAIResponse(message){
  try{
    const response=await axios.post(
      "https://api.openai.com/vi/chat/completions",
      {
       model:"gpt-4",//change model if needed
       message:[{role:"user",content:message}], 
      },
      {
      header:{ Authorication:`Bearer ${process.env.openAPI_API_KEY}`},  
      }
    );
    return response.data.choices[0].message.content;    
  }catch(error){
  console.error("AI API Error:",error);
  return "Sorry,I couldn't process your request,";
  }
}
//websocket server for real-time chat
wss.on("connection", (ws) => {
  console.log("Client connected");
  clients.add(ws);

  ws.on("message", (message) => {
    console.log("Received:", message);
    
    // Simulating AI response
    let botResponse = getAIResponse(message);

    // Send response to client
    ws.send(botResponse);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });
});

// Function to simulate AI assistant response
function getAIResponse(message) {
  if (message.toLowerCase().includes("help")) {
    return "How can I assist you today?";
  }
  return "I'm here to help!";
}

// API for sending notifications when user is not satisfied
app.post("/notify", async (req, res) => {
  const { userEmail, userMessage } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Your admin email
      subject: "User Requesting Live Support",
      text: `User with email ${userEmail} is not satisfied.\n\nMessage: ${userMessage}`,
    });

    res.json({ success: true, message: "Notification sent" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
