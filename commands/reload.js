const Discord = require('discord.js');

exports.run = (db, client, message, args) =>
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
