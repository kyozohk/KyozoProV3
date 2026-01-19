import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kyozo Pro - v3',
  description: 'Kyozo Pro Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
