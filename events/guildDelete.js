const sql = require('sqlite3');
const db = new sql.Database(appDir + '/points.sqlite');
const util = require('util');

db.run = util.promisify(db.run);
db.all = util.promisify(db.all);

exports.run = (client, guild) =>
{
    console.log(guild.id);
    db.run(
        `delete from Guilds where id = "${guild.id}";`)
        .catch(err => console.log(err));
}