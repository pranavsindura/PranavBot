const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client();

<<<<<<< HEAD
const path = require('path');
global.appDir = path.resolve(__dirname);

fs.readdir(appDir + '/events/', (err, files) => 
=======
fs.readdir('./events/', (err, files) => 
>>>>>>> b6446e51656f27e157189a542fb33999983f83ac
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

		client.on(eventName, (...args) => 
		{
				eventFunction.run(client,...args);
		})
	});
});

<<<<<<< HEAD
client.login(process.env.token);
=======
client.login(process.env.BOT_TOKEN);
>>>>>>> b6446e51656f27e157189a542fb33999983f83ac
