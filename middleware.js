import { NextResponse } from 'next/server'
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        )
        return JSON.parse(jsonPayload)
    } catch (e) {
        return null
    }
}
export function middleware(request) {
    const token = request.cookies.get('access_token')?.value
    const { pathname } = request.nextUrl    
    if (token) {
        try {
            const decoded = parseJwt(token)
            const isExpired = Date.now() >= decoded.exp * 1000

            if (isExpired) {
                console.log("Token expired")
                return NextResponse.redirect(new URL('/api/auth/refresh-token', request.url))
            }
            // Optional: block access to registration/login if already logged in
            if (pathname === '/registration' || pathname === '/login') {
                return NextResponse.redirect(new URL('/dashboard', request.url))
            }
        } catch (err) {
            console.error('Invalid token:', err)
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // If not logged in and trying to access /dashboard → redirect to /registration
    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If logged in and trying to access /registration → redirect to /dashboard
    if (token && pathname === '/registration') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard',
        '/registration',
        '/login',
    ],
}