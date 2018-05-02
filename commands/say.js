
exports.run = (client, message, args) =>
{
    if(message.author.id === process.env.ownerID)
    {
        message.delete();
        message.channel.send(args.join(" "));
   
    }
    else
    {
        message.channel.send("Wont work " + message.author + "!");
    }
}