const Discord = require('discord.js');

exports.run = (db, client, message, args, queue) =>
{
    db.get(`select * from Guilds where id = "${message.guild.id}";`)
	.then((row) => 
	{
      let serverQueue = queue.get(message.guild.id);
      let text = "";
      
      if(serverQueue)
      {
        client.fetchUser(serverQueue.nowPlaying.requestedBy).then((u) =>{
        message.channel.send(`Now Playing: **${serverQueue.nowPlaying.title}**, Requested By: ${u.username}\n\n`);
        text = text.concat("Upcoming:\n\n");
        
        if(serverQueue.songList.length)
        {
        serverQueue.songList.forEach((element, index) => 
        {
          
                     text = text.concat(`${index+1}. **${element.title}**\n`);
       
          
        });
          console.log(text);
          message.channel.send(text);  
        }
        else
        {
        text = text.concat("-");
          console.log(text);
          message.channel.send(text);  
        }
                   
      }); 
      }
      
      else
      {
        message.channel.send("The Queue is empty at the moment!");
      }
      
      
      
  }).catch(e => console.log(e));
}