const Discord = require('discord.js');

exports.run = (db, client, member)=>
{
    //const channelHere = member.guild.channels.find('name', 'general');
    //if(!channelHere) channelHere = member.guild.channels.find('name', 'welcome');
    const welcomeChannels = ['general', 'welcome', 'lounge','chat'];
    let channelHere;
    for(let i=0; i<welcomeChannels.length; i++)
    {
        channelHere = member.guild.channels.find('name' , welcomeChannels[i].toString());
        if(channelHere)
        {
         // if(!channelHere.permissionsFor(member.guild.me).has("MANAGE_MESSAGES")) return member.guild.owner.send("Please Make sure that I have **Manage Messages, Manage Roles** Permission!");
            //console.log(channelHere.name); 
                channelHere.send(new Discord.RichEmbed()
                .setTitle("Welcome!")
                .setDescription("Everyone Welcome " + member.user + " to " + member.guild.name + "! Enjoy your Stay!")
                .setColor(0x00AE86));
          /*  
        if(member.user.bot)
        {
          let botRole = member.guild.roles.find("name", "Bot");
          if(botRole)
          {
            
            member.addRole(botRole).catch(e => console.log(e));
          }
          else 
          {
            console.log("Could not find Bot Role");
          }
            
        }
        else
        {
          let humanRole = member.guild.roles.find("name", "Human");
          if(humanRole)
          {
            member.addRole(humanRole).catch(e => console.log(e));
          }
          else 
          {
            console.log("Could not find Human Role");
          
        }*/

  
        }
    
    }
    

}