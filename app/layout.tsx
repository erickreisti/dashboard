// Importa o CSS global do Tailwind (v4)
import "./globals.css";
// Importa o componente de cabeçalho global
import Header from "@/app/components/Header"; // ← Caminho correto para o Header

// Função que define o layout raiz da aplicação
export default function RootLayout({
  children, // Conteúdo das páginas filhas (ex: dashboard/page.tsx)
}: {
  children: React.ReactNode; // Tipagem do conteúdo
}) {
  return (
    // Define o idioma da página como português do Brasil
    <html lang="pt-BR">
      <body className="bg-gray-100">
        {" "}
        {/* Fundo cinza claro */}
        <Header /> {/* Componente global de cabeçalho */}
        <main>{children}</main>{" "}
        {/* Renderiza o conteúdo das páginas filhas aqui */}
      </body>
    </html>
  );
}
