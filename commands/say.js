<<<<<<< HEAD
=======

>>>>>>> b6446e51656f27e157189a542fb33999983f83ac

exports.run = (client, message, args) =>
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
