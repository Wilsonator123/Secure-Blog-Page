const express = require('express');
const router = express.Router();
const testClass = require('../database/testClass');


	
router.get("/test", (req, res) => {
	res.json({
		success: true,
		data: {
			Test:"Data",
		},
	});
});

router.get("/time", async (req, res) => {
	res.json({
		success: true,
		data: {
			Test: await testClass.time(res),
		},
	});
});

module.exports = router;