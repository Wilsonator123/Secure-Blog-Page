"use server";
import axios from "axios";

export const getPost = async (postId) => {
	"use server";
	try {
		const response = await axios.post(
			"http://localhost:8000/posts/getPosts",
			{ args: { _id: postId } }
		);

		return response.data.data;
	} catch (error) {
		console.error(error);
		return [];
	}
};
