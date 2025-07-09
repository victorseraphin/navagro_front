import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes, FaTachometerAlt, FaGift, FaSearch, FaCog, FaUser, FaChevronDown } from 'react-icons/fa';
import { FaRegRectangleList, FaCartShopping } from 'react-icons/fa6';
import { MdInsertChartOutlined } from 'react-icons/md';

export default function NavbarDesktop() {
  const submenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('dashboard');
  const [showCadastros, setShowCadastros] = useState(false);
  const [showDespesas, setShowDespesas] = useState(false);
  const [showReceitas, setShowReceitas] = useState(false);
  const [showRelatorios, setShowRelatorios] = useState(false);
  const [showConfiguracoesMenu, setShowConfiguracoesMenu] = useState(false);
  const [showUsuariosMenu, setShowUsuariosMenu] = useState(false);

  const menu1 = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { id: 'cadastros', label: 'Cadastros', icon: <FaRegRectangleList />, submenu: showCadastros },
    { id: 'despesas', label: 'Lançamento Despesa', icon: <FaCartShopping />, submenu: showDespesas },
    { id: 'receitas', label: 'Lançamento Receita', icon: <FaGift />, submenu: showReceitas },
    { id: 'relatorios', label: 'Relatórios Gerenciais', icon: <MdInsertChartOutlined />, submenu: showRelatorios },
  ];

  const menu2 = [
    { id: 'configuracoes', label: 'Configuração', icon: <FaCog />, submenu: showConfiguracoesMenu },
    { id: 'usuarios', label: 'victorseraphin@gmail.com', icon: <FaUser />, submenu: showUsuariosMenu },
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

  const despesasOptions = ['Insumos', 'Pagamentos de Funcionários'];
  const receitasOptions = ['Produtos'];
  const relatoriosOptions = ['Demonstração do Resultado', 'Resumo de Despesas', 'Resumo de Receitas'];
  const configuracoesOptions = ['Endereços'];
  const usuariosOptions = ['Perfil', 'Sair'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setShowCadastros(false);
        setShowDespesas(false);
        setShowReceitas(false);
        setShowRelatorios(false);
        setShowConfiguracoesMenu(false);
        setShowUsuariosMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Top bar */}
      <div className="bg-emerald-500 text-white px-6 py-3 flex justify-between items-center text-sm">
        <div className="text-lg font-bold">NavAgro</div>

        <div ref={submenuRef} className="hidden md:flex items-center gap-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Procurar"
              className="bg-emerald-600 placeholder-white text-white px-4 py-1 rounded-full text-sm focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-1.5 text-white text-xs" />
          </div>

          {/* Menu de usuário com submenu */}

          {menu2.map(({ id, label, icon, submenu }) => (
            <div key={id} className="relative">
              <button
                onClick={() => {
                  setActive(id);
                  setShowCadastros(id === 'cadastros' ? !showCadastros : false);
                  setShowDespesas(id === 'despesas' ? !showDespesas : false);
                  setShowReceitas(id === 'receitas' ? !showReceitas : false);
                  setShowRelatorios(id === 'relatorios' ? !showRelatorios : false);
                  setShowConfiguracoesMenu(id === 'configuracoes' ? !showConfiguracoesMenu : false);
                  setShowUsuariosMenu(id === 'usuarios' ? !showUsuariosMenu : false);
                }}
                className="flex items-center gap-1"
              >
                <div className="text-xs">{icon}</div>
                <span>{label}</span>
                <FaChevronDown className="text-xs" />
              </button>

              {submenu && id === 'configuracoes' && showConfiguracoesMenu && (
                <ul className="absolute right-0 mt-2 w-40 bg-white text-gray-800 border border-gray-300 rounded-md z-50" style={{ boxShadow: '2px 4px 6px rgba(0,0,0,0.2)' }}>
                  {configuracoesOptions.map((item) => (
                    <li key={item}>
                      <button className="w-full text-left px-4 py-2 text-[12px] hover:bg-emerald-500 hover:text-white">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {submenu && id === 'usuarios' && showUsuariosMenu && (
                <ul className="absolute right-0 mt-2 w-40 bg-white text-gray-800 border border-gray-300 rounded-md z-50" style={{ boxShadow: '2px 4px 6px rgba(0,0,0,0.2)' }}>
                  {usuariosOptions.map((item) => (
                    <li key={item}>
                      <button className="w-full text-left px-4 py-2 text-[12px] hover:bg-emerald-500 hover:text-white">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

        </div>

        <button className="md:hidden focus:outline-none ml-4" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Bottom menu */}
      <div className="bg-white border border-gray-300 relative">
        <ul className="hidden md:flex px-6 text-sm relative ">
          {menu1.map(({ id, label, icon, submenu }) => (
            <li key={id} className="relative border-l border-l-gray-300">
              <button
                onClick={() => {
                  setActive(id);
                  setShowCadastros(id === 'cadastros' ? !showCadastros : false);
                  setShowDespesas(id === 'despesas' ? !showDespesas : false);
                  setShowReceitas(id === 'receitas' ? !showReceitas : false);
                  setShowRelatorios(id === 'relatorios' ? !showRelatorios : false);
                  setShowConfiguracoesMenu(id === 'configuracoes' ? !showConfiguracoesMenu : false);
                  setShowUsuariosMenu(id === 'usuarios' ? !showUsuariosMenu : false);
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

              {submenu && id === 'cadastros' && showCadastros && (
                <ul className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-300 rounded z-50" style={{ boxShadow: '2px 4px 6px rgba(0,0,0,0.2)' }}>
                  {cadastrosOptions.map((item) => (
                    <li key={item}>
                      <button className="w-full text-left px-4 py-2 text-[12px] hover:bg-emerald-500 hover:text-white">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {submenu && id === 'despesas' && showDespesas && (
                <ul className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-300 rounded z-50" style={{ boxShadow: '2px 4px 6px rgba(0,0,0,0.2)' }}>
                  {despesasOptions.map((item) => (
                    <li key={item}>
                      <button className="w-full text-left px-4 py-2 text-[12px] hover:bg-emerald-500 hover:text-white">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {submenu && id === 'receitas' && showReceitas && (
                <ul className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-300 rounded z-50" style={{ boxShadow: '2px 4px 6px rgba(0,0,0,0.2)' }}>
                  {receitasOptions.map((item) => (
                    <li key={item}>
                      <button className="w-full text-left px-4 py-2 text-[12px] hover:bg-emerald-500 hover:text-white">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {submenu && id === 'relatorios' && showRelatorios && (
                <ul className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-300 rounded z-50" style={{ boxShadow: '2px 4px 6px rgba(0,0,0,0.2)' }}>
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
    </div>
  );
}
