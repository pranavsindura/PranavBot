
exports.run = (db, client, guild) =>
{
    console.log(guild.id);
    db.run(
        `delete from Guilds where id = "${guild.id}";`)
        .catch(err => console.log(err));
}
