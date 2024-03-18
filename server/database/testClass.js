const db = require('./index.js');

class testFunctions {
    cat(){
        console.log("This is a cat.");
        return("Cat")
    }
    dog(){
        console.log("This is a dog");
        return("Dog")
    }
    async time(res){
        const result = await db.query('SELECT NOW()')
        res.json({
			success: true,
			data: {
				Test: result.rows,
			},
		});
    }
}

module.exports = new testFunctions();

