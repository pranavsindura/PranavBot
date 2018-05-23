const Discord = require('discord.js');
const ocr = require('ocr-space-api');
//const download = require('download');
const fs = require('fs');

exports.run = (db, client, message, args)=>
{
  //if(message.guild.id !== "430069383008747561") return;
   db.get(`select * from Guilds where id = ${message.guild.id};`)
	.then((row) => 
	{
    if(args.length)
    {
      message.channel.send(new Discord.RichEmbed()
              .setColor(0x00ae86)
              .setTitle("Usage:")
              .setDescription("**`" + row.prefix + "recognize`**"));
    }
     else
     {
       message.reply("You have **`20 seconds`** to send an image!");
       
       const collector = message.channel.createMessageCollector(response => response.author.id === message.author.id, {time:20000});
       
       collector.on('collect', async (i)=>{
         
         if(i.filesize > 1000000){message.channel.send("File Size greater than **`1 MB`**!"); collector.stop();}
         //try{await download(i.attachments.first().url, '/app/logs'); console.log('downloaded');}catch(e){console.log(e)};

         //console.log(i.attachments.first().url);
         let options =  { 
    apikey: process.env.ocrToken,
    url: 'https://api.ocr.space/parse/image',
    language: 'eng',
    imageFormat: 'image/png',
    isOverlayRequired: true
    };
         ocr.parseImageFromUrl(i.attachments.first().url, options)
         .then((result) => {
           //console.log(result.parsedText);
           //while(result.parsedText.includes('Level')){
           let lines = result.parsedText.split(' \r\n');
           if(lines.includes('Guild: Forumers O')){
           let name = lines[0].toString();
           let line2 = lines[1].split(' ');
           //console.log(line2);
           let level = line2[1];
           let XP = line2[2].split(/\(|\/|\)/);
           //console.log(XP);
           let curXP = XP[1];
           let totXP = XP[2];
           //words = words.map((element)=>{element.trim()});
           //console.log(result.parsedText);
           //if(result.ocrParsedResults.IsErroredOnProcessing) return console.log(result.ocrParsedResults.ErrorMessage);
           //message.channel.send(result.Lines);
           message.channel.send("User: "+name+", Level: "+level+", CurrentXP: "+curXP+", TotalXP: "+totXP);
           collector.stop();}
         }).catch(e=>console.log(e+'\nhahalol it  wont work'));
         
         /*await ocr.recognize({input: i.attachments.first()}, async (err, doc) => {
           if(err) {return console.log(err);}
           
           let wordArray = await doc.getWords().map(function(element) {
        let obj = {};
        obj[element.text] = element.area;
        return obj;
    });
           message.channel.send(wordArray.join(" "));
       });*/
         
       });
       collector.on('end',(collected, reason)=>{if(!collected.size)message.channel.send(`There was no collected message that passed the filter within the time limit!`);})/*
       message.channel.awaitMessages(response => response.attachments, {max:1, time:20000, errors: ['time ended']})
          .then( async (collected) => {            
          
         await ocr.recognize({input: collected.attachments.first()}, (err, doc) => {
           if(err) {return console.log(err);}
           
           let wordArray = doc.getWords().map(function(element) {
        let obj = {};
        obj[element.text] = element.area;
        return obj;
    });
           message.channel.send(wordArray.join(" "));
         });
            
          }).catch(e => {console.log(e);message.channel.send('There was no collected message that passed the filter within the time limit!');});*/
     }
  }).catch(e=> console.log(e));
}        