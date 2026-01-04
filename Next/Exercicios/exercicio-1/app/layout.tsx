import "./globals.css";
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR " className={montserrat.className}>
      <body className="">
        <main className="bg-cyan-100 min-h-screen min-w-screen flex items-center justify-center font-sans">
          {children}
        </main>
      </body>
    </html>
  );
}
