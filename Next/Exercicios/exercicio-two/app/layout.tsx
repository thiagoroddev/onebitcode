"use client";

import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

const myLocalFont = localFont({
  src: "../app/fonts/Chandia_PERSONAL_USE_ONLY.otf",
  variable: "--font-my-local-font",
  preload: false,
});

export function Contador() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("Componente de Contador montado");
  }, []);

  return (
    <div>
      <h1>Contador: {counter}</h1>
      <button
        className="bg-amber-300 rouded rounded-bl-3xl p-4"
        onClick={() => setCounter(counter + 1)}
      >
        Incrementar
      </button>
      <p>Este é o componente de contador do nosso site.</p>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="pt-BR" className={myLocalFont.variable}>
      <body>
        <header className="bg-yellow-200 text-center w-full">
          <nav className="flex justify-center">
            <ul className="flex gap-4 p-4 text-center w-max">
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
        </header>
        <main className="flex flex-row gap-16 p-16 bg-zinc-100 dark:bg-zinc-900 min-h-screen">
          <aside>
            <nav className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md">
              <h2 className="text-3xl m-2 p-4" aria-label="Categorias">
                Categorias
              </h2>
              <ul>
                <li>
                  <Link
                    href="/tecnologia"
                    className="text-blue-600 hover:underline"
                  >
                    Tecnologia
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ciencia"
                    className="text-blue-600 hover:underline"
                  >
                    Ciência
                  </Link>
                </li>
                <li>
                  <Link href="/arte" className="text-blue-600 hover:underline">
                    Arte
                  </Link>
                </li>
              </ul>
            </nav>
            <Contador key={pathname} />
          </aside>
          <section className="flex-1">{children}</section>
        </main>
      </body>
    </html>
  );
}
