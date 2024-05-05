const { MongoClient } = require("mongodb");
const fs = require("fs");
// Replace the placeholder with your Atlas connection string

const secretFilePath = '/run/secrets/mongo';
const password = fs.readFileSync(secretFilePath, 'utf8');

class Database {
    constructor() {
        this.url = `mongodb://dbUser:${password}@mongo:27017`;
        this.client = new MongoClient(this.url);
    }

    async run(func, collection, ...args) {
        try {
            await this.client.connect();
            const db = this.client.db('DSS').collection(collection);
            return await func(db, ...args);
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            await this.client.close();
        }
    }

    async read_file(db, args) {
        return await db.find(args).toArray();
    }

    async create_file(db, data) {
        return await db.insertOne(data);
    }

    async write_to_file(db, args, operation, options={}) {
        return await db.updateMany(args, operation, options);
    }

    async delete_file(db, args) {
        return await db.deleteMany(args);
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
