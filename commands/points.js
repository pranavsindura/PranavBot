const Discord = require('discord.js');

exports.run = (db, client, message, args) =>
{

	db.get(`select * from Guilds where id = ${message.guild.id};`)
	.then((row) => 
	{
    if(args.length)
    {
        message.channel.send(new Discord.RichEmbed()
        .setColor(0x00ae86)
        .setTitle("Usage:")
        .setDescription("**`" + row.prefix + "points`**"));
    }
    else
    {
        //let points;
        db.get(`select points from Members where id = "${message.author.id}"`)
            .then((row) =>
            {
                message.channel.send(new Discord.RichEmbed()
                .setColor(0x00ae86)
                .setTitle(message.author.username + "'s Points")
                .setDescription("**" + row.points + "**"));
            })
            .catch(err => console.log(err));
    }
}).catch(err => console.log(err));
}
