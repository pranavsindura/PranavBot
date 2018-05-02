/*const sql = require('sqlite3');
const db = new sql.Database('/pranavbot/points.sqlite');
const util = require('util');

db.run = util.promisify(db.run);
//db.get = util.promisify(db.get);
db.all = util.promisify(db.all);

db.run(
    `update Members set points = 69 where id = "430068214970581002";`
);.then(() =>
    {
        //db.run(`delete from People where age = 15;`).catch(err => console.log(err));
        //db.run(`insert into People values ('Pranav', 17);`).catch(err => console.log(err));
        //db.run(`insert into People values ('Kartik', 15);`).catch(err => console.log(err));
        //db.all(`select * from People`).then((rows) => console.log(rows)).catch(err => console.log(err));
    }
)
.catch(err => console.log(err));*/


//db.run(`delete from Guilds where id = 437663208505868300;`)
//db.run(`delete from Guilds where name = "testing";`)
//.then(() =>{db.all(`select * from Guilds`).then((rows) => console.log(rows)).catch(err => console.log(err));})
//.catch(err => console.log(err));
/*
db.run(
    `Create table if not exists Guilds (name char(5), id char(20), prefix char(1));`
)
.then(() =>{db.all(`select * from Guilds`).then((rows) => console.log(rows)).catch(err => console.log(err));})
.catch(err => console.log(err));

db.run(
    `INSERT INTO Guilds VALUES ("Forumers Guild (GT)", "430069383008747561", ".");`
)//.then(() =>{db.all(`select * from Guilds`).then((rows) => console.log(rows)).catch(err => console.log(err));})
.catch((err) => console.log(err));

db.run(
    `INSERT INTO Guilds VALUES ("PranavBot", "434762457496420352", ".");`
)//.then(() =>{db.all(`select * from Guilds`).then((rows) => console.log(rows)).catch(err => console.log(err));})
.catch((err) => console.log(err));*/
//{db.all(`select * from Members`).then((rows) => console.log(rows)).catch(err => console.log(err));}

//console.log(process.cwd());

