import Providers from "./Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
