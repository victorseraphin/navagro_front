import { useState } from 'react';
import {
  FaBars, FaTimes, FaTachometerAlt, FaUsers, FaChartLine, FaGift,
  FaSearch, FaCog, FaUser, FaClipboardList
} from 'react-icons/fa';
import { FaRegRectangleList, FaCartShopping  } from 'react-icons/fa6';
import { MdInsertChartOutlined } from 'react-icons/md';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('dashboard');
  const [showCadastros, setShowCadastros] = useState(false);
  const [showDespesas, setShowDespesas] = useState(false);
  const [showReceitas, setShowReceitas] = useState(false);
  const [showRelatorios, setShowRelatorios] = useState(false);

  const links = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { id: 'cadastros', label: 'Cadastros', icon: <FaRegRectangleList />, submenu: showCadastros },
    { id: 'despesas', label: 'Lançamento Despesa', icon: <FaCartShopping />, submenu: showDespesas },
    { id: 'receitas', label: 'Lançamento Receita', icon: <FaGift />, submenu: showReceitas },
    { id: 'relatorios', label: 'Relatórios Gerenciais', icon: <MdInsertChartOutlined />, submenu: showRelatorios },
  ];

  const cadastrosOptions = [
    'Bens',
    'Centro de Custos',
    'Centro de Lucros',
    'Clientes / Fornecedores',
    'Funcionários',
    'Insumos',
    'Taxas',
    'Unidade de Negócios'
  ];

  const despesasOptions = [
    'Insumos',
    'Pagamentos de Funcionários'
  ];

  const receitasOptions = [
    'Produtos',
  ];

  const relatoriosOptions = [
    'Demonstração do Resultado',
    'Resumo de Despesas',
    'Resumo de Receitas'
  ];

  return (
    <div>
      {/* Top bar */}
      <div className="bg-emerald-500 text-white shadow-sm px-6 py-3 flex justify-between items-center text-sm">
        <div className="text-lg font-bold">NavAgro</div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Procurar"
              className="bg-emerald-600 placeholder-white text-white px-4 py-1 rounded-full text-sm focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-1.5 text-white text-xs" />
          </div>
          <button className="flex items-center gap-1">
            <FaCog className="text-xs" />
            <span>Configuração</span>
          </button>
          <button className="flex items-center gap-1">
            <FaUser className="text-xs" />
            <span>victorseraphin@gmail.com</span>
          </button>
        </div>

        {/* Menu mobile toggle */}
        <button className="md:hidden focus:outline-none ml-4" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Bottom menu */}
      <div className="bg-white shadow-md relative">
        <ul className="hidden md:flex px-6 space-x-2 text-sm relative">
          {links.map(({ id, label, icon, submenu }) => (
            <li key={id} className="relative">
              <button
                onClick={() => {
                  setActive(id);
                  if (id === 'cadastros') {
                    setShowCadastros(!showCadastros);
                  }else {
                    setShowCadastros(false);
                  } 

                  if (id === 'despesas') {
                    setShowDespesas(!showDespesas);
                  }else {
                    setShowDespesas(false);
                  }

                  if (id === 'receitas') {
                    setShowReceitas(!showReceitas);
                  }else {
                    setShowReceitas(false);
                  }

                  if (id === 'relatorios') {
                    setShowRelatorios(!showRelatorios);
                  } else {
                    setShowRelatorios(false);
                  }
                }}
                className={`flex flex-col items-center justify-center px-4 py-2 text-xs font-medium transition-colors duration-300
                  ${active === id
                    ? 'text-black border-b-2 border-red-500'
                    : 'text-gray-400 hover:text-black hover:border-gray-300 border-b-2 border-transparent'}
                `}
              >
                <div className="text-xl">{icon}</div>
                {label}
              </button>

              {/* Submenu para Cadastros */}
              {submenu && showCadastros && (
                <ul className="absolute top-full left-0 mt-1 w-52 bg-white border rounded shadow-md z-50">
                  {cadastrosOptions.map((item) => (
                    <li key={item}>
                      <button className="w-full text-left px-4 py-2 text-[12px] hover:bg-emerald-500 hover:text-white">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Submenu para Despesas */}
              {submenu && showDespesas && (
                <ul className="absolute top-full left-0 mt-1 w-52 bg-white border rounded shadow-md z-50">
                  {despesasOptions.map((item) => (
                    <li key={item}>
                      <button className="w-full text-left px-4 py-2 text-[12px] hover:bg-emerald-500 hover:text-white">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Submenu para Receitas */}
              {submenu && showReceitas && (
                <ul className="absolute top-full left-0 mt-1 w-52 bg-white border rounded shadow-md z-50">
                  {receitasOptions.map((item) => (
                    <li key={item}>
                      <button className="w-full text-left px-4 py-2 text-[12px] hover:bg-emerald-500 hover:text-white">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Submenu para Relatorios */}
              {submenu && showRelatorios && (
                <ul className="absolute top-full left-0 mt-1 w-52 bg-white border rounded shadow-md z-50">
                  {relatoriosOptions.map((item) => (
                    <li key={item}>
                      <button className="w-full text-left px-4 py-2 text-[12px] hover:bg-emerald-500 hover:text-white">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* TODO: mobile menu pode ser adaptado se quiser esse submenu lá também */}
    </div>
  );
}
