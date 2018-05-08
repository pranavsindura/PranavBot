exports.run = (db, client, message, args, queue) =>
{
    db.get(`select * from Guilds where id = "${message.guild.id}";`)
	.then((row) => 
	{
      let np = queue.get(message.guild.id);
      if(np)
      {
        client.fetchUser(np.nowPlaying.requestedBy).then((u) =>{message.channel.send(`Now Playing: ${np.nowPlaying.title}\nRequested By: ${u.username}`);});  
      }
      else
      {
        message.channel.send("No Music is Playing at the moment, why not play some?");
      }
      
  }).catch(e => console.log(e));
}