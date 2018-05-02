const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client();
const path = require('path');
const appDir = path.resolve(__dirname);
const sql = require('sqlite3');
const db = new sql.Database(appDir + '/points.sqlite', sql.OPEN_READWRITE);
const util = require('util');

db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);

fs.readdir(appDir + '/events/', (err, files) => 
{
	if (err)
	{
		 console.log(err);
		 return;
	}
	files.forEach((file) => 
	{
		let eventFunction = require(`${appDir}/events/${file}`);
		let eventName = file.split(".")[0];

		client.on(eventName,  (...args) => 
		{
				eventFunction.run(db, client,...args);
		})
	});
});

client.login(process.env.token);

// server.js
// where your node app starts

// init project
const http = require('http');
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// Simple in-memory store
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.get("/dreams", (request, response) => {
  response.send(dreams)
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", (request, response) => {
  dreams.push(request.query.dream)
  response.sendStatus(200)
});

// listen for requests :)


