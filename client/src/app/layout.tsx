import { PlayerProvider } from "./mostmar_valami_tenyleg"
import styles from './main.module.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PlayerProvider>
      <html lang="en" className={styles.boody}>
        <body className={styles.boody}>{children}</body>
      </html>
    </PlayerProvider>
  )
}
