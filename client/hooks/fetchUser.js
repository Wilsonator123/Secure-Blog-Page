"use server";

import axios from "axios";
import { cookies } from "next/headers";
export const getUser = async (username = undefined) => {
	"use server";
	try {
		const id = cookies().get("id") ?? "";

		const response = await axios.post(
			"http://127.0.0.1:8000/account/getUser",
			{
				username: username,
			},
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: "id=" + id.value,
				},
				withCredentials: true,
			}
		);
		return response.data.data;
	} catch (error) {
		return false;
	}
};

export const clearUser = async () => {
	"use server";
	try {
		const id = cookies().get("id");
		if (!id) return false;
		cookies().set("id", "", { expires: new Date(0) });
	} catch (error) {
		return false;
	}
};
