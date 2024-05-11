'use server'
import {NextResponse} from 'next/server'
import { cookies } from 'next/headers'
const API_URL = 'http://localhost:8000/'

// This function can be marked `async` if using `await` inside

// I think we should give ids to unauthenticated users which allow them to read

// There should be routes for users /account, /create etc.
async function checkPermission(scope, cookie){
    return await fetch(API_URL + 'auth/hasPermission', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'id=' + cookie
        },
        body: JSON.stringify({scope})
    })
}
// There should be admin routes /admin
export async function middleware(request) {
    const id = request.cookies.get('id')?.value ?? ''

    if(request.nextUrl.pathname.startsWith('/login')){
        const response =  NextResponse.next()
        if(id){
            const result = await fetch(API_URL + 'auth/validateID', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': 'id=' + id
                },
                credentials: 'include'
            })
            if(result.ok){
                return NextResponse.redirect(new URL('/feed', request.url))
            }else{
                response.cookies.set('id', '', {expires: new Date(0)})
                return response
            }
        }
        else{
            return NextResponse.next()
        }
    }
    if(request.nextUrl.pathname.startsWith('/create')){
        const res = await checkPermission(['user:write'], id)
        if(res.ok){
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    if(request.nextUrl.pathname.startsWith('/account')){
        const res = await checkPermission(['user:logged_in', 'user:read'], id)
        if(res.ok){
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    if(request.nextUrl.pathname.startsWith('/admin')){
        const res = await checkPermission(['admin'], id)
        if(res.ok){
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/404', request.url))
        }
    }
}

export const config = {

}