const Discord = require('discord.js');

exports.run = (db, client, message, args) =>
{
	db.get(`select prefix from Guilds where id = ${message.guild.id};`)
	.then((row) => 
	{
    if(args.length)
    {
        message.channel.send(new Discord.RichEmbed()
        .setColor(0x00ae86)
        .setTitle("Usage:")
        .setDescription("**`" + row.prefix + "noticeme`**"));
    }
    else
    {
        message.reply("I see you're trying to get attention.");
    }
}).catch(err => console.log(err));
}
