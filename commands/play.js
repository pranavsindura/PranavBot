const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const escape = require('escape-markdown');
const YouTube = require('simple-youtube-api');

const youtube = new YouTube(process.env.ytToken);

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
                  if(args[0].toString().match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/))
                  {
                    try{
                    let playlist = await youtube.getPlaylist(args[0].toString());
                    let videos = await playlist.getVideos();
                    videos.forEach((element) => {
                    handleVideo(element, message, queue, voiceChannel, playlist);
                    });
                    }catch(e){
                      console.log(e);
                      message.channel.send("Sorry, I could not find any results for that query!"); 
                    }
                  }
                  else
                  {
                  let video;
                  try{
                    video = await youtube.getVideo(args[0].toString());
                  }catch(e){
                    console.log(e);
                    console.log("Now searching for text");
                    try{
                      let videos = await youtube.searchVideos(args.join(" ").toString(), 1);
                      video = await youtube.getVideoByID(videos[0].id);
                    }catch(e2){
                      console.log(e2);
                      message.channel.send("Sorry, I could not find any results for that query!"); 
                      return;
                    }
                  }
                 // console.log(video);
                  
                  handleVideo(video, message, queue, voiceChannel, 0);
    
                }
                  //console.log(video);
                  //const songInfo = await ytdl.getInfo(args[0]).catch(e=>{console.log(e); message.channel.send("Invalid URL"); return;});
                  //console.log(songInfo.url);
                    
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
        .setDescription("**`" + row.prefix + "play <URL or Search String>`**"));
        
        }
        
    })
    .catch(e => console.log(e));
}

function handleVideo(video, message, queue, voiceChannel, playlist)
{
                const song = {
                                      id: video.id,
                                      title: escape(video.title),
                                      url: `https://www.youtube.com/watch?v=${video.id}`,
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
                      if(playlist) message.channel.send("**" + playlist.title + "** has been added to Queue.");
                      else message.channel.send("**" + song.title + "** has been added to Queue.");
                        play( message, queue, song);
                    }).catch(e => console.log(e));

                  }
                  else
                  {
                    serverQueue.songList.push(song);
                    if(playlist) return;
                    else message.channel.send(song.title + " has been added to Queue.");
                  }
}


function play(message, queue, song)
{
 
  const serverQueue = queue.get(message.guild.id);
  //if(!song){}
  const dispatcher  = serverQueue.connection.playStream(ytdl(song.url), {filter : 'audioonly'});
  serverQueue.nowPlaying = song;
  //console.log(serverQueue.nowPlaying);
  dispatcher.setVolume(serverQueue.volume);
  serverQueue.songList.shift();
    dispatcher.on("end", (reason) =>{
                        console.log(reason);
                        if(serverQueue.songList[0])
                        {
                          play(message, queue, serverQueue.songList[0]);
                        }
                        else
                        {
                          serverQueue.voiceChannel.leave('Queue Empty');queue.delete(message.guild.id);return;
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