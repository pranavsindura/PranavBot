const sql = require('sqlite3');
<<<<<<< HEAD
const db = new sql.Database(appDir + '/points.sqlite');
=======
const db = new sql.Database('./sqldb/points.sqlite');
>>>>>>> b6446e51656f27e157189a542fb33999983f83ac
const util = require('util');

db.get = util.promisify(db.get);


exports.run = (client, message, args) => {

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
        message.channel.send(":ping_pong: **Pong!**");
    }
}).catch(err => console.log(err));
}
