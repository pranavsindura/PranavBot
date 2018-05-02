const Discord = require('discord.js');
const sql = require('sqlite3');
const db = new sql.Database(appDir + '/points.sqlite');
const util = require('util');

db.get = util.promisify(db.get);

exports.run = (client, message, args)=>
{
    db.get(`select * from Guilds where id = ${message.guild.id};`)
	.then((row) => 
	{
        if(!args.length || args.length === 1)
        {
            message.channel.send(new Discord.RichEmbed()
            .setColor(0x00ae86)
            .setTitle("Usage:")
            .setDescription("**`" + row.prefix + "selfdestruct <time in seconds> <message>`**"));
        }
        else
        {
            let time = parseInt(args.shift(), 10) * 1000;
            if(time > 10000)
                time = 10000;
            else if(time < 0)
                time = 0;
                
            message.delete();
            message.channel.send(args.join(" "))
            .then((m) => 
            {
                setTimeout(() =>{
                    m.delete();
                },time);
            })
            .catch(err => console.log(err));
        }
    }).catch(err => console.log(err));
}