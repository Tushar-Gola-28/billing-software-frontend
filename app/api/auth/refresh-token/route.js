// pages/api/auth/refresh-token.ts
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const cookieHeader = request.headers.get('cookie')
        // Call your backend to refresh token
        const backendResponse = await fetch(process.env.BASE_URL + "/service/customer_service/v1/refresh-token",
            {
                method: 'POST',
                credentials: 'include', // 👈 VERY IMPORTANT to send the refresh_token cookie
                headers: {
                    'Content-Type': 'application/json',
                    ...(cookieHeader ? { cookie: cookieHeader } : {}),
                },
            }
        )
        if (!backendResponse.ok) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        let data = await backendResponse.json()
        data = data._payload
        
        const newAccessToken = data?.accessToken
        const refresh_token = data?.refreshToken
        const user = data?.user
        const plan = data?.plan
        const response = NextResponse.redirect(new URL('/dashboard', request.url))
        response.cookies.set('access_token', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            maxAge: 60 * 60 * 1000,  // 1 hour expiration
            path: '/',
        })
        response.cookies.set('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',

            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        })
        response.cookies.set('user', user, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        })
        response.cookies.set('plan', plan, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        })

        // redirect("/dashboard")
        return response
    } catch (err) {
        console.log(err);

    }
}
