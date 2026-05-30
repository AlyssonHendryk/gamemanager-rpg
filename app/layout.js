import "./globals.css"

export const metadata = {
  title: "RPG Battle Manager",
  description: "Sistema simples de batalha RPG",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}