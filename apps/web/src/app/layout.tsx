import React from 'react';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata = {
  title: 'Apply4Jobs – Intelligent AI-Powered Job Marketplace',
  description: 'Enterprise Multi-Tenant SaaS Job Platform matching skills and recommending jobs with AI-driven ATS scores.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body style={{ fontFamily: 'var(--font-nunito), Nunito, sans-serif' }}>{children}</body>
    </html>
  );
}

