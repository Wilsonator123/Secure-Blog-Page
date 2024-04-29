const db = require('../database/index.js');
async function getUser(userID){
    let result = await db.query("getUser",[userID])
    if(result.rows.length === 0){
        return false
    } else {
        return result.rows[0]
    }
}

module.exports = {
    getUser
}