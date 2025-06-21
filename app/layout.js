import '../styles/index.css'
import '../styles/materialize-color.css'
import '../styles/font.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'Confusians',
  description: 'Confusians Blog',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
