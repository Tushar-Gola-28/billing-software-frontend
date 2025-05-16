
import React from 'react'
export async function generateMetadata() {
    const title = "PayStream Dashboard | Real-Time Billing Insights & Control"
    const description = "Monitor all your billing operations in one place. Get insights on sales, payments, and customer activities with PayStream’s intuitive dashboard.";
    const keywords = "billing dashboard, invoice tracking, business analytics, payment monitoring, PayStream control panel"
    return {
        title, // Fallback to default title if not available
        description,
        keywords,
        robots: "index, follow",
        openGraph: {
            title,
            description,
            url: `${process.env.FRONTEND_URL}/dashboard`,
            images: [
                {
                    url: "/images/logo/small_logo.svg",
                },
            ],
        },
        alternates: {
            canonical: `${process.env.FRONTEND_URL}/dashboard`,
        },
        language: "en",
    };
}
export default function DashboardPage() {
    return (
        <div>
            <h1>DashboardPage</h1>
            {/* <LoadingScreen/> */}
        </div>
    )
}
