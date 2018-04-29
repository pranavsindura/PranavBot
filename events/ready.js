exports.run = (client) =>
{
    console.log(`Ready to server in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
    const sql = require('sqlite3');
    const db = new sql.Database('./points.sqlite');
    const util = require('util');

    db.run = util.promisify(db.run);
    db.run(
        `Create table if not exists Guilds (name char(50), id char(20), prefix char(1));`
    ).catch(err => console.log(err));

    db.run(
        `Create table if not exists Members (name char(20), id char(20), points real);`
    ).catch(err => console.log(err));

    client.user.setActivity(`${client.guilds.size} servers`,{type: 'Listening'});

}

/*
Guilds -> name char(50), id real, prefix char(1)
Members -> name char(50), id real, points real
*/
