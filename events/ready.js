exports.run = (db, client) =>
{
    console.log(`Ready to server in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
    /*db.run(
        `Create table if not exists Guilds (name char(50), id char(20), prefix char(1));`
    )
  .then(() =>{db.all(`select * from Guilds`).then((rows) => console.log(rows)).catch(err => console.log(err));})
      .catch(err => console.log(err));

    db.run(
        `Create table if not exists Members (name char(20), id char(20), points real);`
    )
      .then(() =>{db.all(`select * from Members`).then((rows) => console.log(rows)).catch(err => console.log(err));})
      .catch(err => console.log(err));*/

    client.user.setActivity(`${client.guilds.size} servers`,{type: 'Listening'});

}

/*
Guilds -> name char(50), id real, prefix char(1)
Members -> name char(50), id real, points real
Recent -> id char(20)
*/
