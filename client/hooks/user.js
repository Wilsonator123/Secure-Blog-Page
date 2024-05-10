"use client";

import { useUserStore } from "@/context/UserContext";
import { getUser, clearUser } from "@/hooks/fetchUser";
export async function updateUser() {
	const user = await getUser();
	if (user) {
		useUserStore.getState().setUser(user);
		return true;
	}
	return false;
}

export async function logout() {
	await clearUser();
	useUserStore.getState().logout();
	return true;
}
