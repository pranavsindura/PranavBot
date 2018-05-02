const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client();
const path = require('path');
global.appDir = path.resolve(__dirname);
console.log(appDir);
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

		client.on(eventName, (...args) => 
		{
				eventFunction.run(client,...args);
		})
	});
});

client.login(process.env.token);

