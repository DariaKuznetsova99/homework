const { request, response } = require("express");
const express = require("express");
const app = express();
const { readData, writeData } = require("./utils");

const port = 3001;
const hostname = "localhost";
const path = require("path");

let shelves = [];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

app.use("/js", express.static(path.join(__dirname + "/../dist/js")));
app.use("/css", express.static(path.join(__dirname + "/../dist/css")));

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use((request, response, next) => {
  console.log(new Date().toISOString(), request.method, request.originalUrl);
  next();
});

app.get("/shelves", async (request, response) => {
  shelves = await readData();
  response.setHeader("Content-Type", "application/json");
  response.json(shelves);
});

app.use(express.json());

app.options("/*", (request, response) => {
  response.statusCode = 200;
  response.send("OK");
});

app.post("/shelves", async (request, response) => {
  shelves.push(request.body);

  await writeData(shelves);
  response.setHeader("Content-Type", "application/json");
  response.status(200).json({
    info: `Added`,
  });
});

app.put("/shelves/:shid", async (request, response) => {
  const { data } = request.body;
  const shid = Number(request.params.shid);
  console.log(data);
  shelves[shid] = data;
  await writeData(shelves);
  response.setHeader("Content-Type", "application/json");
  response.status(200).json({
    info: `Updated`,
  });
});

app.delete("/shelves/:shid", async (request, response) => {
  const shid = Number(request.params.shid);
  shelves.splice(shid, 1);
  await writeData(shelves);
  response.setHeader("Content-Type", "application/json");
  response.status(200).json({
    info: `Deleted '${shid}'`,
  });
});

app.listen(port, hostname, (err) => {
  if (err) {
    console.log("Error: ", err);
  }
  console.log(`server is working on ${hostname}:${port}`);
});
