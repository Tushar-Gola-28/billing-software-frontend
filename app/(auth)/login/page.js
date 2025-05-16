import { Login } from '@/features'
import React from 'react'
export async function generateMetadata() {
    const title = "Login to PayStream | Secure Billing Access"
    const description = "Sign in to your PayStream account to manage invoices, payments, and customer data with secure access.";
    const keywords = "PayStream login, secure billing software, account access, invoice management login"
    return {
        title, // Fallback to default title if not available
        description,
        keywords,
        robots: "index, follow",
        openGraph: {
            title,
            description,
            url: `${process.env.FRONTEND_URL}/login`,
            images: [
                {
                    url: "/images/logo/small_logo.svg",
                },
            ],
        },
        alternates: {
            canonical: `${process.env.FRONTEND_URL}/login`,
        },
        language: "en",
    };
}
export default function LoginPage() {
    return (
        <div>
            <Login />
        </div>
    )
}
