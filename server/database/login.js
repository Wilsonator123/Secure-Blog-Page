const db = require('./index.js');

class loginFunctions {
    cat(){
        console.log("This is a cat.");
    }
    dog(){
        console.log("This is a dog");
    }
    time(){
        res.json({
			success: true,
			data: {
				Test:"Data",
			},
		});
    }
}

module.exports = new loginFunctions();

