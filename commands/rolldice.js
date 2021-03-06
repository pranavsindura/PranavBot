const Discord = require('discord.js');

function editDice(m, num)
{

    if(!num)
    {
        setTimeout(() =>
        {
            let number = Math.floor(Math.random() * 6) + 1;
            m.edit("Its a **" + number + "** !");
        }, 300);
    }
    else
    {
        setTimeout(() => {
            m.edit(m.content + ".").then((m) => 
            {
                editDice(m, num-1);
            });
        },300);
    }
}

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
        .setDescription("**`" + row.prefix + "rolldice`**"));
    }
    else
    {
        let roll = "Rolling a Dice..."
        message.channel.send("Rolling a Dice").then((m) =>
    {

        editDice(m, 3);
        
    }).catch((err) => {return console.log(err)});

    }
}).catch(err => console.log(err));
}
