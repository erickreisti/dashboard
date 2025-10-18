export default function Header() {
  return (
    <header className="bg-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Meu E-commerce</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/dashboard" className="text-blue-600 hover:underline">
                Dashboard
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
