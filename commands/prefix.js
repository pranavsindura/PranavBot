
const fs = require('fs');
const Discord = require('discord.js');
exports.run = (db,client, message, args) =>
{
    if(message.author.id !== message.guild.ownerID)
    {
        message.channel.send("Prefix can only be changed by the Owner, " + message.guild.owner.user);
    }
    else
    {
        if(!args.length || args.length > 1)
    {
        db.get(`select prefix from Guilds where id = "${message.guild.id}";`)
            .then((row) =>
            {
                message.channel.send(new Discord.RichEmbed()
        .setTitle("Usage:")
		.setDescription("**`" + row.prefix + "prefix <newPrefix>`**")
        .setColor(0x00AE86));
            })
            .catch(err =>  console.log(err));
        //message.channel.send("Please mention the Prefix(1 char)\n");
        ///message.channel.send(config.prefix + "prefix <newPrefix>");
    }
        else
    {
        let newPrefix = args[0].slice(0,1);
        db.run(`update Guilds set prefix = "${newPrefix}" where id = "${message.guild.id}";`)
        .then(() => 
        {
            db.get(`select prefix from Guilds where id = "${message.guild.id}";`)
            .then((row) =>
            {
                message.channel.send(new Discord.RichEmbed()
            .setTitle("Prefix Changed!")
            .setDescription(`**Prefix Changed to: ${newPrefix}**`)
            .setColor(0x00AE86));
            //.addField("","To recover the Prefix type\n `@PranavBot# prefix`"));
            console.log(`Prefix for ${message.guild.name} Changed to: ${row.prefix}`);
            })
            .catch((err) => console.log(err));
        })
        .catch(err => console.log(err));

    }
    }
}
