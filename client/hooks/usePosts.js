"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const usePosts = async (args = {}) => {
	"use server";
	const id = request.cookies.get("id")?.value ?? "";
	try {
		const response = await axios.post(
			"http://localhost:8000/posts/getPosts",
			{ args: args },
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
				Cookies: "id=" + id,
			}
		);
		return response.data.data;
	} catch (error) {
		console.error(error);
		return [];
	}
};
