exports.run = (db, client, message, args, queue) =>
{
    db.get(`select * from Guilds where id = "${message.guild.id}";`)
	.then((row) => 
	{
        if(message.member.voiceChannel)
        {   
          const serverQueue = queue.get(message.guild.id);
          if(serverQueue)
          {
            const dispatcher = queue.get(message.guild.id).connection.dispatcher;
            if(dispatcher.paused)
            {
              dispatcher.resume();
              message.channel.send("Music has been Resumed!");
            }
          }
          else
            
          {message.channel.send("There is nothing to resume!");}
        }
        else
        {
            message.reply("Join the Voice Channel first!");
        }
    })
    .catch(e => console.log(e));
}