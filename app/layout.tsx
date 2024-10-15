import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

const TelegramInitializerWrapper = dynamic(
  () => import('./components/TelegramInitializer'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Todo Mini App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-black text-white`}>
        <TelegramInitializerWrapper />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}