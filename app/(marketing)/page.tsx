// app/(marketing)/page.tsx - Página inicial pública
export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Bem-vindo ao Meu E-commerce</h1>
      <p className="mt-4 text-gray-600">
        Esta é a página pública de marketing.
        <a href="/dashboard" className="text-blue-600 hover:underline ml-2">
          Ir para Dashboard ›
        </a>
      </p>
    </div>
  );
}
