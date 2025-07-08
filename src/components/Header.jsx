import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="flex items-center justify-between px-6 py-3">
        <h1 className="text-lg font-semibold">Painel Administrativo</h1>
        <ul className="flex gap-6">
          <li>
            <Link
              to="/"
              className={isActive('/') ? 'font-bold underline' : ''}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={isActive('/users') ? 'font-bold underline' : ''}
            >
              Usuários
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={isActive('/settings') ? 'font-bold underline' : ''}
            >
              Configurações
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
