"use server";
import axios from "axios";

export const usePosts = async (args = {}) => {
	"use server";
	try {
		const response = await axios.post(
			"http://localhost:8000/posts/getPosts",
			{ args: args },
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error(error);
		return [];
	}
};
