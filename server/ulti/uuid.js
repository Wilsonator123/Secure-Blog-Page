const db = require('../database/index.js');
const { v4: uuidv4 } = require('uuid');


async function genUUID() {
    let uuid = uuidv4();
    //console.log((await db.query("isUUIDtaken", [uuid]))[0].count);
    while ((await db.query("isUUIDtaken", [uuid]))[0].count != 0) {
      uuid = uuidv4();
    }
    return uuid;
  }


 // genUUID().then((result) => console.log(result)).catch((err) => console.error(err));




module.exports = {
    genUUID
}