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
        .setDescription("**`" + row.prefix + "ping`**"));
    }
    else
    {
        message.channel.send(":ping_pong: **Pong!** `" + client.ping + "ms`");
    }
}).catch(err => console.log(err));
}
