const Database = require('../database/mongo.js');

const db = new Database();
async function createPost(data) {
    data = {
        title: data['title'],
        content: data['content'],
        created_at: new Date(),
        comments: data['comments'] ?? []
    }
    return await db.run(db.create_file, 'posts',  data);
}

async function deletePost(data){
    return await db.run(db.delete_file, 'posts',  data)
}

async function modifyComment(action, args, data={}){
    switch(action){
        case "add":
            console.log(args, data)
            return await db.run(db.write_to_file, 'posts', args, {"comments": data}, 'push')
        case "delete":
            return await db.run(db.write_to_file, 'posts', args, data, 'delete')
    }

}


module.exports = {
    createPost,
    deletePost,
    modifyComment
};