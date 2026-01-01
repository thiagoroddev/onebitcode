import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";

const myLocalFont = localFont({
  src: "../app/fonts/Chandia_PERSONAL_USE_ONLY.otf",
  variable: "--font-my-local-font",
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={myLocalFont.variable}>
      <body>
        <main>
          <nav>
            <ul className="flex gap-4 mb-16">
              <li>
                <Link
                  href="/"
                  className="text-lg text-blue-600 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-lg text-blue-600 hover:underline"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/teste/123"
                  className="text-lg text-blue-600 hover:underline"
                >
                  Teste
                </Link>
              </li>
              <li>
                <Link
                  href="/teste/subpasta-teste"
                  className="text-lg text-blue-600 hover:underline"
                >
                  Subpasta-Teste
                </Link>
              </li>
            </ul>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
