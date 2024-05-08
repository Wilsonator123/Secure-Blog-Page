const Database = require('../database/mongo.js');
const { ObjectId } = require('mongodb');
const mongo = new Database();
const db = require('../database/index.js');
async function createPost(data) {
    return await mongo.run(mongo.create_file, 'posts',  data);
}

async function getPosts(args){
    if (args['_id']){
        args['_id'] = new ObjectId(args['_id'])
    }

    try {
        const response = await mongo.run(mongo.read_file, 'posts', args)
        for (const data of response) {
            const user = await db.query("getUser", [data.created_by])
            data.created_by = user[0].username

        }
        return response
    } catch (error) {
        console.log(error)
    }
}

async function modifyPost(args, data){
    return await mongo.run(mongo.write_to_file, 'posts', args, {'$set': data})
}

async function deletePost(data){
    return await mongo.run(mongo.delete_file, 'posts',  data)
}

async function modifyComment(action, args, comment = {}, data={}){
    let result;
    switch(action){
        case "get":
            result = await mongo.run(mongo.read_file, 'posts', args)
            if(result){
                return result.comments.filter((data) => data.message === comment['comment.message'])
            }
            return "Comment not found"

        case "add":
            data['comment_id'] = new ObjectId()
            data['created_at'] = new Date()

            result = await mongo.run(mongo.write_to_file, 'posts', args, {'$push': {"comments": data}})

            if (result.modifiedCount > 0 || result.matchedCount > 0) {
                return 'Comment added'
            }

            return 'Comment not added'

        case "edit":
            data['edited'] = true
            data['edited_at'] = new Date()
            result = await mongo.run(mongo.write_to_file, 'posts', args, {'$set': {"comments.$[comment]": data}}, { "arrayFilters": [comment] })
            if (result.modifiedCount > 0 || result.matchedCount > 0) {
                return 'Comment edited'
            }

            return 'Comment not found/edited'

        case "delete":
            result = await mongo.run(mongo.write_to_file, 'posts', args, {'$pull': {"comments": data}})
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