const sql = require('sqlite3');
const db = new sql.Database('/app/.data/sqlite.db');
const db2 = new sql.Database('/app/points.sqlite');
const util = require('util');

db.run = util.promisify(db.run);
//db.get = util.promisify(db.get);
db.all = util.promisify(db.all);
/*
db.run(
    `Create table if not exists Members (name char(50), id real, points real);`
)
//.then(() =>{db2.all(`select * from Guilds`).then((rows) => console.log(rows)).catch(err => console.log(err));})
.catch(err => console.log(err));*/
//db.all(`select * from Recent`).then((rows) => console.log(rows)).catch(err => console.log(err));
//db.run(`delete from Guilds where id = "434762457496420352"`);
/*
db.run(
        `INSERT INTO Guilds VALUES ("Forumers Guild (GT)", "430069383008747561", ".");`)
        .catch((err) => console.log(err));*/
db.run(
`update Guilds set id = "437663208505868290" where name="testing";`
).then(db.all(`select * from Recent`).then((rows) => console.log(rows)).catch(err => console.log(err)));
