
exports.run = (db, client, message, args) =>
{
    if(message.author.id === process.env.ownerID)
    {
        message.delete();
        message.channel.send(args.join(" "));
   
    }
    else
    {
        return;
    }
}
