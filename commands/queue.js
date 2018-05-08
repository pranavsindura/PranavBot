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
        message.channel.send(`Now Playing:\n**${serverQueue.nowPlaying.title}**, Requested By: ${u.username}`);
        text = text.concat("\nUpcoming:\n\n");
        
        if(serverQueue.songList.length)
        {
          let set = Math.ceil(serverQueue.songList.length/20);
          for(let i=0; i<set; i++)
          {
            for(let j=i*20; j<(i+1)*20; j++)
            {
              if(serverQueue.songList[j]) text = text.concat(`${j+1}. **${serverQueue.songList[j].title}** \n`);
              else break;
            }
             message.channel.send(text);
             text = "";
          }
          //console.log(text); 
        }
        else
        {
        text = text.concat("-");
          //console.log(text);
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