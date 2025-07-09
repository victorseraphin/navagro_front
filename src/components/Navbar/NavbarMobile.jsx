import { useState, useEffect, useRef } from 'react';
import {
  FaBars, FaTimes, FaTachometerAlt, FaGift, FaSearch, FaCog, FaUser, FaChevronDown
} from 'react-icons/fa';
import { FaRegRectangleList, FaCartShopping } from 'react-icons/fa6';
import { MdInsertChartOutlined } from 'react-icons/md';

export default function NavbarMobile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const submenuRef = useRef(null);

  const handleToggle = (id) => {
    setActive(id);
    setOpenSubmenu((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setOpenSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaTachometerAlt />
    },
    {
      id: 'cadastros',
      label: 'Cadastros',
      icon: <FaRegRectangleList />,
      options: ['Bens', 'Centro de Custos', 'Centro de Lucros', 'Clientes / Fornecedores', 'Funcionários', 'Insumos', 'Taxas', 'Unidade de Negócios']
    },
    {
      id: 'despesas',
      label: 'Lançamento Despesa',
      icon: <FaCartShopping />,
      options: ['Insumos', 'Pagamentos de Funcionários']
    },
    {
      id: 'receitas',
      label: 'Lançamento Receita',
      icon: <FaGift />,
      options: ['Produtos']
    },
    {
      id: 'relatorios',
      label: 'Relatórios Gerenciais',
      icon: <MdInsertChartOutlined />,
      options: ['Demonstração do Resultado', 'Resumo de Despesas', 'Resumo de Receitas']
    },
    {
      id: 'configuracoes',
      label: 'Configurações',
      icon: <FaCog />,
      options: ['Endereços']
    },
    {
      id: 'usuario',
      label: 'victorseraphin@gmail.com',
      icon: <FaUser />,
      options: ['Perfil', 'Sair']
    }
  ];

  return (
    <div className="md:hidden bg-emerald-500 text-white">
      <div className="p-4 flex justify-between items-center">
        <span className="text-lg font-bold">NavAgro</span>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div ref={submenuRef} className="bg-white text-black shadow-md">
          {menuItems.map(({ id, label, icon, options }) => (
            <div key={id}>
              <button
                onClick={() => handleToggle(id)}
                className="flex justify-between items-center w-full px-4 py-3 border-t border-gray-200 text-sm font-medium hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{icon}</span>
                  {label}
                </div>
                {options && <FaChevronDown className={`transition-transform ${openSubmenu === id ? 'rotate-180' : ''}`} />}
              </button>

              {options && openSubmenu === id && (
                <ul className="pl-8 py-2 text-sm">
                  {options.map((option) => (
                    <li key={option} className="py-1 text-[13px] hover:text-emerald-600">
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
