
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Growing Up Muslim Events',
  description: 'Events, speakers, and community for Growing Up Muslim.',
  manifest: '/manifest.json', // Link to the manifest file
  icons: {
    // The primary favicon, using the modern .ico format
    icon: '/favicon.ico', 
    // A high-quality PNG fallback and for general use
    shortcut: '/icon1.png', 
    // The icon for Apple devices (e.g., when added to homescreen)
    apple: '/apple-icon.png', 
    // Other icons for different resolutions or purposes
    other: [
      {
        rel: 'icon',
        url: '/icon1.png',
        sizes: 'any',
      },
      {
        rel: 'icon',
        url: '/icon0.svg',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
