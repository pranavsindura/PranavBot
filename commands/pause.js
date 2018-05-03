exports.run = (db, client, message, args, queue) =>
{
    db.get(`select * from Guilds where id = "${message.guild.id}";`)
	.then((row) => 
	{
        if(message.member.voiceChannel)
        {   
            if(message.author.id === queue.get(message.guild.id).nowPlaying.requestedBy || message.author.id === message.guild.ownerID )
            {
              const dispatcher = queue.get(message.guild.id).connection.dispatcher;
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
        {
            message.reply("Join the Voice Channel first!");
        }
    })
    .catch(e => console.log(e));
}