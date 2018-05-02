const fs = require('fs');
const Discord = require('discord.js');
const sql = require('sqlite3');
const db = new sql.Database(appDir + '/points.sqlite');
const util = require('util');

db.run = util.promisify(db.run);
db.get = util.promisify(db.get);

exports.run = (client, message, args) =>
{
    if(message.author.id !== process.env.ownerID)
    {
        message.reply("Command disabled by Owner.");
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

        /*
        config.prefix = newPrefix;
        	
        fs.writeFile("/PranavBot/config.json", JSON.stringify(config, null, 2),(err) => 
        {
            if(err)
            {
                config.prefix = oldPrefix;
                return console.log(err);
            }
            
            message.channel.send(new Discord.RichEmbed()
            .setTitle("Prefix Changed!")
            .setDescription(`**Prefix Changed to: ${config.prefix}**`)
            .setColor(0x00AE86));
            //.addField("","To recover the Prefix type\n `@PranavBot# prefix`"));
            console.log(`Prefix Changed to: ${config.prefix}`);
            //fs.readFile("./config.json", (err,data)=>{if(err) throw err; console.log(JSON.parse(data))});
            
        });*/
    }
    }
}