import {NextResponse} from 'next/server'

const API_URL = 'http://localhost:8000/'

// This function can be marked `async` if using `await` inside

// I think we should give ids to unauthenticated users which allow them to read

// There should be routes for users /account, /create etc.
async function checkPermission(scope){
    return await fetch(API_URL + 'auth/hasPermission', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({scope})
    })
}
// There should be admin routes /admin
export async function middleware(request) {
    // Check cookie exists
    // Validate Cookie
    // If cookie is valid check permissions

    // Check if the cookie has the correct permissions and within that check if its valid
    if(request.nextUrl.pathname.startsWith('/create')){
        const id = await checkPermission(['user:write'])
        if(id.ok){
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    if(request.nextUrl.pathname.startsWith('/account')){
        const id = await checkPermission(['user:logged_in', 'user:read'])
        if(id.ok){
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    if(request.nextUrl.pathname.startsWith('/admin')){
        const id = await checkPermission(['admin'])
        if(id.ok){
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/404', request.url))
        }
    }
}

export const config = {

}