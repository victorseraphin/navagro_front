import { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaUsers, FaChartLine, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('dashboard');

  const links = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { id: 'users', label: 'Usuários', icon: <FaUsers /> },
    { id: 'reports', label: 'Relatórios', icon: <FaChartLine /> },
    { id: 'logout', label: 'Sair', icon: <FaSignOutAlt /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold tracking-wide cursor-pointer select-none">Painel Admin</h1>
        
        {/* Menu desktop */}
        <ul className="hidden md:flex space-x-1 text-sm">
          {links.map(({ id, label, icon }) => (
            <li key={id}>
              <button
                onClick={() => setActive(id)}
                className={`flex items-center space-x-2 px-3 py-2 text-lg font-medium transition-colors duration-300
                  ${active === id ? 'border-b-4 border-white text-white' : 'text-white/75 hover:text-white'}
                `}
              >
                {icon}
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Botão hamburguer mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <ul className="md:hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 space-y-2 px-6 pb-4">
          {links.map(({ id, label, icon }) => (
            <li key={id}>
              <button
                onClick={() => {
                  setActive(id);
                  setMenuOpen(false);
                }}
                className={`flex items-center space-x-2 w-full text-left px-3 py-2 text-lg font-medium transition-colors duration-300
                  ${active === id ? 'border-l-4 border-white text-white' : 'text-white/75 hover:text-white'}
                `}
              >
                {icon}
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
