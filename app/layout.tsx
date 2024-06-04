import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <main className='prose mx-auto max-w-7xl px-6 py-12'>{children}</main>
      </body>
    </html>
  );
}
