exports.run = (client, message, args) =>
{
    if(message.author.id === process.env.ownerID)
    {
        if(!args.length || args.length > 1)
            return;
        else
        {
            client.emit(args[0], message.guild);
        }
    }
    else
        return;
    
}
