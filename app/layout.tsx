import ResponsiveAppBar from '@/components/AppBar/AppBar'
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/auth/AuthContext'
import { cookies } from 'next/headers';
import { ClientCookiesProvider } from '@/components/auth/ClientCookiesProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientCookiesProvider value={cookies().getAll()}>
          <AuthProvider>
            <ResponsiveAppBar />
            {children}
          </AuthProvider>
        </ClientCookiesProvider>
      </body>
    </html>
  )
}
