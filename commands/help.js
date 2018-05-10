const Discord = require('discord.js');


exports.run = (db, client, message, args) =>
{
	db.get(`select * from Guilds where id = "${message.guild.id}";`)
	.then((row) => 
	{

    if(args.length)
    {
        message.channel.send(new Discord.RichEmbed()
        .setColor(0x00ae86)
        .setTitle("Usage:")
        .setDescription("**`" + row.prefix + "help`**"));
    }
    else
    {
    const embed = new Discord.RichEmbed()
        .setColor(0x00ae86)
        .setTitle("Help Menu");

        embed.addField("**Prefix**", row.prefix);
        embed.addField("**Prefix Commands**", "prefix");
        embed.addField("**Help Commands**", "help, info");
        embed.addField("**Random Commands**", "clap, noticeme, ping, rolldice, say");
        embed.addField("**Music Commands**", "play, pause, resume, skip, stop, queue, nowplaying");
        embed.addField("**Points Commands**", "points");
        embed.addField("Forgot Prefix?","To grab your current prefix, type,\n **`@PranavBot#5465 help`**");
        message.channel.send(embed);


    }
}).catch(err => console.log(err));
}
