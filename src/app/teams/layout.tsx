import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function TeamsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} min-h-screen bg-gradient-to-r from-green-400 to-blue-500`}>{children}</div>
  );
}
