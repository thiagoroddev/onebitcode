import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className="">
                <main className="bg-amber-100 min-h-screen min-w-screen flex items-center justify-center font-sans">
                    {children}
                </main>
            </body>
        </html>
    );
}
