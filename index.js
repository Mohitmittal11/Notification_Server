const http = require("http");
const express = require("express");
const bodyparser = require("body-parser");
const connectedDatabase = require("./Configuration/config");
const NotificationModel = require("./Models/notificationModule");
const userinfoModel = require("./Models/userinfoModule");
const UserMessageModels = require("./Models/usermessage");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const Port = 8001;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.send("This is a get request on a Port 8001");
});

app.post("/submitData", async (req, res) => {
  // console.log("Re")
  // const data=  await req.body;
  // console.log("Data is ", data);
  const result = await NotificationModel.create(req.body.data);
  if (result) {
    res.json({ statusCode: 200, data: result });
  } else {
    res.json({ statusCode: 400, msg: "No Data Inserted" });
  }
});

app.post("/addusermessagedata", async (req, res) => {
  const result = await req.body.message;
  console.log("Result received by user", result);
  const response = await UserMessageModels.create(result);
  if (response) {
    res.json({ statusCode: 200, userData: response });
  }
});

io.on("connection", async (socket) => {
  console.log("Someone is connected with id ", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received from Client is", msg);

    socket.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Someone is Disconnected", socket.id);
  });
});

app.get("/getServerData", async (req, res) => {
  const result = await UserMessageModels.find().sort({ createdAt: -1 });

  res.json({ statusCode: 200, data: result });
});

app.post("/submitUserData", async (req, res) => {
  io.on("connection", (socket) => {
    console.log("SomeOne has Connected with id", socket.id);

    socket.on("message", (msg) => {
      socket.broadcast.emit("message", msg);
      console.log("Messge Received", msg);
    });

    // socket.on("disconnect", () => {
    //   console.log("Socket is Disconnected", socket.id);
    // });
  });
  const bodyData = await req.body.data;
  console.log("Body Data is", bodyData);

  const result = await userinfoModel.create(bodyData);
  if (result) {
    res.json({ statusCode: 200, data: result });
    console.log("Result is", result);
  }
});

server.listen(Port, () => {
  console.log(`Server is Started at Port ${Port}`);
});
