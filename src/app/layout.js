import { plusJakartaSans } from '@/lib/fonts'
import { siteConfig } from '@/config/site'
import { LanguageProvider } from '@/i18n/LanguageProvider'
import './globals.css'

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: siteConfig.logo,
    shortcut: siteConfig.logo,
    apple: siteConfig.logo,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
