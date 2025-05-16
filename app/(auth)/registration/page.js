import { Registration } from '@/features'
import React from 'react'
export async function generateMetadata() {
    const title = "Get Started with PayStream | Register for Free"
    const description = "Sign up for PayStream and take control of your billing. Enjoy easy invoicing, customer tracking, and payment automation.";
    const keywords = "register billing software, sign up PayStream, invoicing tool trial, billing system registration"
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
export default function RegistrationPage() {
    
    return (
        <div>
            <Registration />
        </div>
    )
}
