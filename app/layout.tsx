import "./globals.css";
import Header from "./components/layout/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
