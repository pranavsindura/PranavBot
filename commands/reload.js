const Discord = require('discord.js');
<<<<<<< HEAD
const sql = require('sqlite3');
const db = new sql.Database(appDir + '/points.sqlite');
=======

const sql = require('sqlite3');
const db = new sql.Database('./sqldb/points.sqlite');
>>>>>>> b6446e51656f27e157189a542fb33999983f83ac
const util = require('util');

db.get = util.promisify(db.get);

exports.run = (client, message, args) =>
{

	db.get(`select * from Guilds where id = ${message.guild.id};`)
	.then((row) => 
	{
    
    if(message.author.id === process.env.ownerID)
    {
    	delete require.cache[require.resolve(`./${args[0]}.js`)];
        message.channel.send("Reloaded").then((m) =>
	{
		setTimeout(() => {m.delete()},3000);
	});
    }
    else
    {
        return;
    }
}).catch(err => console.log(err));
}
