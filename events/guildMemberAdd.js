const Discord = require('discord.js');

exports.run = (client, member)=>
{
    //const channelHere = member.guild.channels.find('name', 'general');
    //if(!channelHere) channelHere = member.guild.channels.find('name', 'welcome');
    const welcomeChannels = ['general', 'welcome'];
    let channelHere;
    for(let i=0; i<welcomeChannels.length; i++)
    {
        channelHere = member.guild.channels.find('name' , welcomeChannels[i].toString());
        if(channelHere)
        {
            console.log(channelHere.name); 
                channelHere.send(new Discord.RichEmbed()
                .setTitle("Welcome!")
                .setDescription("Everyone Welcome " + member.user + " to " + member.guild.name + "! Enjoy your Stay!")
                .setColor(0x00AE86));
            
        if(member.user.bot)
        {
            member.addRole(member.guild.roles.find("name", "Bot"));
        }
        else
        {
            member.addRole(member.guild.roles.find("name", "Human"));
        }

        return;
        }
    
    }
    

}