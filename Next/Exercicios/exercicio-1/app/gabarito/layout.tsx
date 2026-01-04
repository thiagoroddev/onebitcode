export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-amber-300 min-h-screen min-w-screen flex items-center justify-center font-sans">
      {children}
    </main>
  );
}
