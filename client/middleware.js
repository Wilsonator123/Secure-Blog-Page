"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const API_URL = "http://127.0.0.1:8000/";

async function checkPermission(scope, cookie) {
	return await fetch(API_URL + "auth/hasPermission", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Cookie: "id=" + cookie,
		},
		body: JSON.stringify({ scope }),
	});
}

export async function middleware(request) {
	const id = request.cookies.get("id")?.value ?? "";

	if (request.nextUrl.pathname.startsWith("/login")) {
		const response = NextResponse.next();
		if (id) {
			const result = await fetch(API_URL + "auth/validateID", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Cookie: "id=" + id,
				},
				credentials: "include",
			});
			if (result.ok) {
				return NextResponse.redirect(new URL("/", request.url));
			} else {
				response.cookies.set("id", "", { expires: new Date(0) });
				return response;
			}
		} else {
			return NextResponse.next();
		}
	}
	if (request.nextUrl.pathname.startsWith("/create")) {
		const res = await checkPermission(["posts:create"], id);
		if (res.ok) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}
	if (request.nextUrl.pathname == "/account") {
		try {
			if (!id)
				return NextResponse.redirect(new URL("/login", request.url));
			const result = await fetch(API_URL + "account/getUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: "id=" + id,
				},
				credentials: "include",
			});
			const user = (await result.json()).data;

			if (result.ok) {
				return NextResponse.redirect(
					new URL(`/account/${user.username}`, request.url)
				);
			} else {
				return NextResponse.redirect(new URL("/login", request.url));
			}
		} catch (error) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}
	if (request.nextUrl.pathname.startsWith("/admin")) {
		const res = await checkPermission(["admin"], id);

		if (res.ok) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL("/404", request.url));
		}
	}
}

export const config = {};
