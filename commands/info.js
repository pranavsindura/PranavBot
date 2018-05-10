const Discord = require('discord.js');

exports.run = (db, client, message, args)=>
{

    db.get(`select * from Guilds where id = ${message.guild.id};`)
	.then((row) => 
	{
        if(args.length)
        {
            message.channel.send(new Discord.RichEmbed()
            .setColor(0x00ae86)
            .setTitle("Usage:")
            .setDescription("**`" + row.prefix + "info`**"));
        }
        else
        {
          let seconds = Math.floor(client.uptime/1000);
          let days = 0, hours = 0, minutes = 0;
          if(seconds >= 60)
          {
            minutes = Math.floor(seconds/60);
            seconds = seconds%60;
            if(minutes >=  60)
            {
              hours = Math.floor(minutes/60);
              minutes = minutes%60;
              if(hours >= 24)
              {
                days = Math.floor(hours/24);
                hours = hours%24;
              }
            }
          }
          const uptimeStr = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
          
           message.channel.send(new Discord.RichEmbed()
            .setColor(0x00ae86)
            .setTitle("Bot Information")
            .setDescription("PranavBot was created by Pranav#5038 while trying to learn Javascript.\nIts a bot with many useless commands.\nOh and it can also play music!\nHosted on **Glitch.com**")
             .addField("List of Commands", "Type **`" + row.prefix + "help`** to list all the commands\n")
            .addField("Stats",`**Servers:** ${client.guilds.size}\n**Users:** ${client.users.size}\n**Uptime:** ${uptimeStr}\n`)
          .addField("Useful Links", "**Invite PranavBot:** https://discordbots.org/bot/435848685532741643\n**Support Server:** https://discordapp.com/invite/Ru8PMym\n**Hosting Server:** https://pranavbot.glitch.me\n")
          .addField("Any Requests?","DM **Pranav#5038** for any requests related to the bot!"));
        }
    }).catch(err => console.log(err));
}
