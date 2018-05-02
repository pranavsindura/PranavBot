const sql = require('sqlite3');
<<<<<<< HEAD
const db = new sql.Database(appDir + '/points.sqlite');
=======
const db = new sql.Database('./sqldb/points.sqlite');
>>>>>>> b6446e51656f27e157189a542fb33999983f83ac
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
