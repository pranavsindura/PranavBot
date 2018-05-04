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
            if(message.author.id === serverQueue.nowPlaying.requestedBy || message.author.id === message.guild.ownerID )
            {
              serverQueue.connection.dispatcher.end();
              message.channel.send("Music was Skipped!");
            }
          else
          {
            message.reply("You did not request this music!");
          }
          }else
          {message.channel.send("There is nothing to skip!");}
        }
        else
        {
            message.reply("Join the Voice Channel first!");
        }
    })
    .catch(e => console.log(e));
}