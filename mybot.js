const Discord = require("discord.js");
const config = require('/config.json');
const fs = require('fs');

const client = new Discord.Client();

const hasTalkedRecently = new Set();

fs.readdir('./events/', (err, files) => 
{
	if (err)
	{
		 console.log(err);
		 return;
	}

	files.forEach((file) => 
	{
		let eventFunction = require(`./events/${file}`);
		let eventName = file.split(".")[0];

		client.on(eventName, (...args) => 
		{
				eventFunction.run(client,...args);
		})
	});
});

client.login(BOT_TOKEN);
