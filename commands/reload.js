const Discord = require('discord.js');
const sql = require('sqlite3');
const db = new sql.Database(appDir + '/points.sqlite');
const util = require('util');

db.get = util.promisify(db.get);

exports.run = (client, message, args) =>
{

	db.get(`select * from Guilds where id = ${message.guild.id};`)
	.then((row) => 
	{
    
    if(message.author.id === process.env.ownerID)
    {
        if(!args.length || args.length >1)
        {
            //message.channel.send("Please mention the command to reload.\n"+config.prefix+"reload <command>");
            message.channel.send(new Discord.RichEmbed()
            .setColor(0x00ae86)
            .setTitle("Usage:")
            .setDescription("**`" + row.prefix + "reload <command>`**"));
        }
        else
        {
            delete require.cache[require.resolve(`./${args[0]}.js`)];
            message.channel.send("Reloaded");
        }
    }
    else
    {
        return;
    }
}).catch(err => console.log(err));
}