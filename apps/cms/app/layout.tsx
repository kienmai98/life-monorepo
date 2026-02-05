import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Life CMS - xAI Style',
  description: 'CMS Đĩ pro của ba Dan 🔥',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
