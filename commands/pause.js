exports.run = (db, client, message, args, queue) =>
{
    db.get(`select * from Guilds where id = "${message.guild.id}";`)
	.then((row) => 
	{
    
        if(message.member.voiceChannel)
        {   const serverQueue = queue.get(message.guild.id);
         if(serverQueue)
         {
            if(message.author.id === message.guild.ownerID || message.author.id === serverQueue.nowPlaying.requestedBy)
            {
              const dispatcher = serverQueue.connection.dispatcher;
              if(dispatcher.paused) return;
              if(dispatcher)
              {
                dispatcher.pause();
                message.channel.send("Music has been Paused!");
              }
              
            }
          else
          {
            message.reply("You did not request this music!");
          }
         }
         else
         {message.channel.send("There is nothing to pause!");}
        }
        else
        {
            message.reply("Join the Voice Channel first!");
        }
    
      
    })
    .catch(e => console.log(e));
}