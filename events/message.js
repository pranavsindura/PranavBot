const Discord = require('discord.js');
const config = require("/PranavBot/config.json");
const sql = require('sqlite3');
const db = new sql.Database('/pranavbot/points.sqlite');
const util = require('util');

db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);


exports.run = (client, message) =>
{
	db.get(`select * from Guilds where id = ${message.guild.id};`)
	.then((row) => 
	{
		//Adding Points
/*
	if(!message.author.bot && message.channel.type !== "dm")
	{
		//Tag help
		
		if(message.mentions.members.some((m) => m.id == config.myID) && message.content.includes("help"))
		{
			message.channel.send(new Discord.RichEmbed()
			.setColor(0x00ae86)
			.setTitle("Help Menu")
			.addField("Current Prefix", row.prefix)
			.addField("For More Info","type **`" + row.prefix + "help`**"));
		}

		db.get(
			`select * from Members where id = "${message.author.id}";`)
		.then((row) =>
		{
			if(!row)
			{
				db.run(
					`Insert into Members values ("${message.author.username}", "${message.author.id}", 0);`)
					.catch(err => console.log(err));
			}
			else
			{
				db.run(
						`Update Members set points = points+1 where id = "${message.author.id}";`)
						.catch(err => console.log(err));
			}
		})
		.catch((err) => 
		{
			console.log(err);
		});
	}
*/
	//Handling Messages
	if(message.author.bot || message.channel.type === "dm")
	{
		return;
	}
	else if(!message.content.startsWith(row.prefix))
	{
		if(message.mentions.members.some((m) => m.id == config.myID) && message.content.includes("help"))
		{
			message.channel.send(new Discord.RichEmbed()
			.setColor(0x00ae86)
			.setTitle("Help Menu")
			.addField("Current Prefix", row.prefix)
			.addField("For More Info","type **`" + row.prefix + "help`**"));
		}

		db.get(
			`select * from Members where id = "${message.author.id}";`)
		.then((row) =>
		{
			if(!row)
			{
				db.run(
					`Insert into Members values ("${message.author.username}", "${message.author.id}", 0);`)
					.catch(err => console.log(err));
			}
			else
			{
				db.run(
						`Update Members set points = points+1 where id = "${message.author.id}";`)
						.catch(err => console.log(err));
			}
		})
		.catch((err) => 
		{
			console.log(err);
		});
		return;
		
	}
	else
	{
	
		db.get(`select * from Recent where id = "${message.author.id}";`)
		.then((r) => 
		{
			if(r)
			{
				return;
			}else
			{
				db.run(`insert into Recent values ("${message.author.id}");`)
				.catch(e => console.log(e));

				setTimeout(() => {
					db.run(`delete from Recent where id = "${message.author.id}";`)
					.catch(e => console.log(e));
				}, 3000);

				const args = message.content.slice(row.prefix.length).trim().split(/ +/g);
				const command = args.shift().toLowerCase();

				try
				{
			
					try
					{
						let commandFile = require(`/PranavBot/commands/${command}.js`);
						commandFile.run(client, message, args);
					}
					catch(e)
					{
						console.log(e);
					}
			
			
				}catch(err)
				{
					console.log(err);
        		}
					}
		}).catch(e => console.log(e));

	}
}).catch(err => console.log(err));
}
