import { Button } from '@mui/material'
import React from 'react'

export async function generateMetadata() {
  const title = "Smart Billing Software for Businesses | PayStream"
  const description = "Streamline your billing, automate invoicing, and manage customers effortlessly with PayStream – built for modern small and medium businesses.";
  const keywords = "billing software, invoicing software, PayStream, online billing tool, SME billing solution, customer billing management"
  return {
    title, // Fallback to default title if not available
    description,
    keywords,
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: process.env.FRONTEND_URL,
      images: [
        {
          url: "/images/logo/small_logo.svg",
        },
      ],
    },
    alternates: {
      canonical: process.env.FRONTEND_URL,
    },
    language: "en",
  };
}
export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Button>Hello World</Button>
    </div>
  )
}
