const Discord = require('discord.js');
/* global Map */
const queue = new Map();

exports.run = (db, client, message) =>
{

	db.get(`select * from Guilds where id = ${message.guild.id};`)
	.then((row) => 
	{
		//Adding Points
	//Handling Messages
	if(message.author.bot || message.channel.type === "dm")
	{
		return;
	}
	else if(!message.content.startsWith(row.prefix))
	{
		if(message.mentions.members.some((m) => m.id == process.env.myID) && message.content.includes("help"))
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

						let commandFile = require(`/app/commands/${command}.js`);

						commandFile.run(db, client, message, args, queue);
					}
					catch(e)
					{
						console.log(e);
					}
			
				
					}
		}).catch(e => console.log(e));

	}
}).catch(err => console.log(err));
}
