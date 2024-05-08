"use server";

import { cookies } from "next/headers";
export const getUser = async () => {
	"use server";
	try {
		const id = cookies().get("id");
		if (!id) return false;

		const response = await fetch("http://localhost:8000/account/getUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: "id=" + id.value,
			},
			withCredentials: true,
			credentials: "include",
		});
		const data = await response.json();
		return data.data;
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
