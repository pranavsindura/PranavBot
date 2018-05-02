const sql = require('sqlite3');
const db = new sql.Database('/app/points.sqlite');
const util = require('util');

db.run = util.promisify(db.run);
//db.get = util.promisify(db.get);
db.all = util.promisify(db.all);

db.run(
    `Create table if not exists Recent (id char(20));`
)
.then(() =>{db.all(`select * from Members`).then((rows) => console.log(rows)).catch(err => console.log(err));})
.catch(err => console.log(err));

//db.run(`delete from Guilds where id = "434762457496420352"`);

/*db.run(
        `INSERT INTO Guilds VALUES ("testing", "437663208505868290", ".");`)
        .catch((err) => console.log(err));*/
