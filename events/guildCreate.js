const Discord = require('discord.js');

exports.run = (db, client, guild) =>
{
    db.run(
        `INSERT INTO Guilds VALUES ("${guild.name}", "${guild.id}", ".");`)
        .catch((err) => console.log(err));

    const welcomeChannels = ['general', 'welcome', 'lounge','chat'];
    for(let i=0; i<welcomeChannels.length; i++)
    {
    let channelHere = guild.channels.find('name' , welcomeChannels[i].toString());

    if(channelHere)
    {
      //if(!channelHere.permissionsFor(guild.me).has("MANAGE_MESSAGES")) return guild.owner.send("Please Make sure that I have **Manage Messages** Permission!");
        console.log(channelHere.name);
        channelHere.send(new Discord.RichEmbed()
        .setTitle("Hey There!")
        .setDescription("Thank You for Inviting me to " + guild.name + "!")
        .setColor(0x00AE86));
      
       client.user.setActivity(`${client.guilds.size} servers`,{type: 'Listening'});
      
      channelHere.send(new Discord.RichEmbed()
			.setColor(0x00ae86)
			.setTitle("Help Menu")
			.addField("Current Prefix", ".")
			.addField("For More Info","type **`" + "."+ "help`**"));
      

    } 
}   
}
