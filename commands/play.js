const Discord = require('discord.js');
const ytdl = require('ytdl-core');

exports.run =  (db, client, message, args, queue) =>
{
    db.get(`select * from Guilds where id = "${message.guild.id}";`)
	.then(async (row) => 
	{
        if(args.length)
        {
            const voiceChannel = message.member.voiceChannel;

          
            if(voiceChannel)
            {
                
                if(!voiceChannel.permissionsFor(message.guild.me).has("CONNECT"))
                {
                    message.reply("I do not have the permission to Connect to the Voice Channel you're in.");
                }
                else if(!voiceChannel.permissionsFor(message.guild.me).has("SPEAK"))
                {
                    message.reply("I do not have the permission to Speak in the Voice Channel you're in.");
                }
                else
                {
                  const songInfo = await ytdl.getInfo(args[0]).catch(e=>{console.log(e); message.channel.send("Invalid URL"); return;});
                  //console.log(songInfo.url);
                  const song = {
                                      title: songInfo.title,
                                      url: args[0],
                                      requestedBy: message.author.id
                                };
                                            
                  const serverQueue = queue.get(message.guild.id);
                  if(!serverQueue)
                  {
                    const queueConstruct = {
                        textChannel : message.channel,
                        voiceChannel : voiceChannel,
                        connection : null,
                        songList : [],
                        volume : 1,
                        playing: true,
                        nowPlaying : null
                    };
                    
                    queue.set(message.guild.id, queueConstruct);
                    queueConstruct.songList.push(song);
                    
                    voiceChannel.join().then((connection) =>
                    {
                      queueConstruct.connection = connection;
                        console.log("Connected to " + voiceChannel.name);
                        message.channel.send(songInfo.title + " has been added to Queue.");
                        play( message, queue, song);
                    }).catch(e => console.log(e));

                  }
                  else
                  {
                    serverQueue.songList.push(song);
                  
                    message.channel.send(songInfo.title + " has been added to Queue.");
                  }
                    
                }
            }
            else
            {
                message.channel.send("Please join a voice channel first!");
            }
        }
        else
        {
            message.channel.send(new Discord.RichEmbed()
        .setColor(0x00ae86)
        .setTitle("Usage:")
        .setDescription("**`" + row.prefix + "play <youtube-url>`**"));
        
        }
        
    })
    .catch(e => console.log(e));
}

function play(message, queue, song)
{
 
  const serverQueue = queue.get(message.guild.id);
  //if(!song){}
  const dispatcher  = serverQueue.connection.playStream(ytdl(song.url), {filter : 'audioonly'});
  serverQueue.nowPlaying = song;
  console.log(serverQueue.nowPlaying);
  dispatcher.setVolume(serverQueue.volume);
  serverQueue.songList.shift();
    dispatcher.on("end", () =>{
                        if(serverQueue.songList[0])
                        {
                          play(message, queue, serverQueue.songList[0]);
                        }
                        else
                        {
                          serverQueue.voiceChannel.leave();queue.delete(message.guild.id);return;
                        }
                        
                        /*if(!serverQueue.length) {return;}
                        else if(n === serverQueue.songList.length)
                        {serverQueue.voiceChannel.leave();queue.delete(message.guild.id);}
                        else
                        { 
                          play(client, message, queue, serverQueue.songList[n], n+1);
                        }*/
                        
                  })
                  .on("error", e => console.log(e));
 
  
                  
                  
}