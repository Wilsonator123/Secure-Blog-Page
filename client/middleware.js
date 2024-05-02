'use server'
import {NextResponse} from 'next/server'
import { cookies } from 'next/headers'
const API_URL = 'http://127.0.0.1:8000/'

async function checkPermission(scope, cookie){
    try {
        return await fetch(API_URL + 'auth/hasPermission', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'id=' + cookie
            },
            body: JSON.stringify({scope})
        })
    } catch (error) {
        console.error(error)
        return true
    }
}
// There should be admin routes /admin
export async function middleware(request) {
    const id = request.cookies.get('id')?.value || null

    if(request.nextUrl.pathname.startsWith('/login')) {
        const response = NextResponse.next()
        if (id) {
            try{
                const result = await fetch(API_URL + 'auth/validateID', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': 'id=' + id
                    },
                    credentials: 'include'
                })
                if (result.ok) {
                    return NextResponse.redirect(new URL('/feed', request.url))
                } else {
                    response.cookies.set('id', '', {expires: new Date(0)})
                    return response
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            return NextResponse.next()
        }
    }
    if(request.nextUrl.pathname.startsWith('/create')){
        if(id) {
            const res = await checkPermission(['post:create'], id)
            if (res.ok) {
                return NextResponse.next()
            }
        }
        return NextResponse.redirect(new URL('/login', request.url))

    }
    if(request.nextUrl.pathname.startsWith('/account')){
        if(id){
            const res = await checkPermission(['account:read'], id)
            if(res.ok){
                return NextResponse.next()
            }
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if(request.nextUrl.pathname.startsWith('/admin')){
        if(id){
            const res = await checkPermission(['admin:read'], id)
            if(res.ok){
                return NextResponse.next()
            }
        }

        return NextResponse.redirect(new URL('/404', request.url))
    }
}

export const config = {

}