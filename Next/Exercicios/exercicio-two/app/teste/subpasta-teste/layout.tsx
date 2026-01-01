export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children} <h1>Layout do subpasta-teste</h1>
    </div>
  );
}
