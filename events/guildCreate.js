const Discord = require('discord.js');
const fs = require('fs');
const sql = require('sqlite3');
const db = new sql.Database('./points.sqlite');
const util = require('util');

db.run = util.promisify(db.run);
db.all = util.promisify(db.all);

exports.run = (client, guild) =>
{
    db.run(
        `INSERT INTO Guilds VALUES ("${guild.name}", "${guild.id}", ".");`)
        .catch((err) => console.log(err));

    const welcomeChannels = ['general', 'welcome', 'lounge'];
    for(let i=0; i<welcomeChannels.length; i++)
    {
    let channelHere = guild.channels.find('name' , welcomeChannels[i].toString());

    if(channelHere)
    {
        console.log(channelHere.name);
        channelHere.send(new Discord.RichEmbed()
        .setTitle("Hey There!")
        .setDescription("Thank You for Inviting me to " + guild.name + "!")
        .setColor(0x00AE86));
        
        const embed = new Discord.RichEmbed()
        .setColor(0x00ae86)
        .setTitle("Avaiable Commands");
    
    fs.readdir("./commands/", (err, files) =>
    {
        if(err)
        {
            return console.log(err);
        }

        let comm = [];
        files.forEach((file) =>
        {
            comm.push(file.split(".")[0]);
        });

        embed.addField("**Prefix:**", ".");
        embed.addField("**Commands:**", comm.join(", "))
        channelHere.send(embed);

    });

    } 
}   
}
