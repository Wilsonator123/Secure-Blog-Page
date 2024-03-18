

module.exports = (components) => {
	const { express, login } = components; // Add database functio name express,
	const router = express.Router();
	
	router.get("/test", (req, res) => {
		res.json({
			success: true,
			data: {
				Test:"Data",
			},
		});
	});

	router.get("/login", (req, res) => {
		res.json();
	});

return router;
};