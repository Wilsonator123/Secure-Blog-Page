const Database = require('../database/mongo.js');
const { ObjectId } = require('mongodb');
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

async function getPosts(args){
    const result = await db.run(db.read_file, 'posts', args)
    return result
}

async function modifyPost(args, data){
    return await db.run(db.write_to_file, 'posts', args, {'$set': data})
}

async function deletePost(data){
    return await db.run(db.delete_file, 'posts',  data)
}

async function modifyComment(action, args, comment = {}, data={}){
    let result;
    switch(action){
        case "get":
            result = await db.run(db.read_file, 'posts', args)
            if(result){
                return result.comments.filter((data) => data.message === comment['comment.message'])
            }
            return "Comment not found"

        case "add":
            data['comment_id'] = new ObjectId()
            data['created_at'] = new Date()

            result = await db.run(db.write_to_file, 'posts', args, {'$push': {"comments": data}})

            if (result.modifiedCount > 0 || result.matchedCount > 0) {
                return 'Comment added'
            }

            return 'Comment not added'

        case "edit":
            data['edited'] = true
            data['edited_at'] = new Date()
            result = await db.run(db.write_to_file, 'posts', args, {'$set': {"comments.$[comment]": data}}, { "arrayFilters": [comment] })
            if (result.modifiedCount > 0 || result.matchedCount > 0) {
                return 'Comment edited'
            }

            return 'Comment not found/edited'

        case "delete":
            result = await db.run(db.write_to_file, 'posts', args, {'$pull': {"comments": data}})
            if (result.modifiedCount > 0 || result.matchedCount > 0) {
                return 'Comment deleted'
            }
            return 'Comment not found/deleted'
    }
}

module.exports = {
    createPost,
    getPosts,
    deletePost,
    modifyComment
};