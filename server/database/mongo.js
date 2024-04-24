const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require("fs");
// Replace the placeholder with your Atlas connection string

const secretFilePath = '/run/secrets/mongo';

class Database {
    uri = null;
    client = null

    constructor() {
        try {
            this.uri = fs.readFileSync(secretFilePath, 'utf8');
            this.client = new MongoClient(this.uri, {
                serverApi: ServerApiVersion.v1
            });
        } catch (error) {
            console.error(error);
        }
    }

    async run(func, collection, ...args) {
        try {
            await this.client.connect();
            const db = this.client.db('DSS').collection(collection)
            return await func(db, ...args);
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            await this.client.close();
        }
    }

    async read_file(db , args) {
        return db.findOne(args);
    }

    async create_file(db, data) {
        return db.insertOne(data);
    }

    async write_to_file(db, args, data, operation=null) {
        if(operation === 'push'){
            return db.updateOne(args, { $push: data });
        }
        else if (operation === 'delete'){
            return db.updateOne(args, { $pull: {"comments": data}});
        }
        return db.updateOne(args, { $set: data }, { upsert: true });
    }

    async delete_file(db, args) {
        return db.deleteOne(args);
    }
}

module.exports = Database;

/*
    const db = new Database();
    await db.run(db.create_file, <collection_name>, <arguments | WHERE clause>);
    await db.run(db.create_file, 'test', {test: "test"});

    await db.run(db.read_file, <collection_name>, <arguments | WHERE clause>);
    await db.run(db.read_file, 'test', {test: "test"});

    await db.run(db.write_to_file, <collection_name>, <arguments | WHERE clause>, <data>);
    await db.run(db.write_to_file, 'test', {test: "test"}, {test: "test2"});

    await db.run(db.delete_file, <collection_name>, <arguments | WHERE clause>);
    await db.run(db.delete_file, 'test', {test: "test"});
 */
