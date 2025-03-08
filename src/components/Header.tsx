// components/Header.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fechar o menu quando uma rota é selecionada
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <header 
            className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' 
                    : 'bg-gradient-to-r from-blue-50 to-purple-50 py-4'
            }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link 
                    to="/" 
                    className="flex items-center space-x-3 group"
                    aria-label="Ricardo Dias - Arte & Desenho"
                >
                    <div className={`relative overflow-hidden rounded-full ${
                        scrolled ? 'w-10 h-10' : 'w-14 h-14'
                    } transition-all duration-300`}>
                        <img
                            src="assets/imagens/LOGOTIPO.webp"
                            alt="Logo Ricardo Dias Arte"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                            scrolled ? 'text-lg' : 'text-2xl'
                        }`}>
                            Ricardo Dias
                        </span>
                        <span className={`text-gray-600 transition-all duration-300 ${
                            scrolled ? 'text-xs' : 'text-sm'
                        }`}>
                            Arte & Desenho
                        </span>
                    </div>
                </Link>

                {/* Botão de menu mobile */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-200 transition-all duration-300"
                    aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                >
                    {isMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* Menu de navegação */}
                <nav className={`
                    md:flex md:items-center md:space-x-1
                    ${isMenuOpen 
                        ? 'block absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl py-6 px-6 animate-fadeIn' 
                        : 'hidden'
                    }
                `}>
                    <NavLink 
                        to="/" 
                        icon="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" 
                        label="Inicial"
                        isActive={location.pathname === '/'}
                    />
                    <NavLink 
                        to="/cursos" 
                        icon="M2 3h20v14H2z M14 17v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4 M6 7h12" 
                        label="Cursos"
                        isActive={location.pathname.startsWith('/cursos')}
                    />
                    <NavLink 
                        to="/perguntas-frequentes" 
                        icon="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 16v-4 M12 8h.01" 
                        label="FAQ"
                        isActive={location.pathname === '/perguntas-frequentes'}
                    />
                    <Link 
                        to="/contato"
                        className="mt-4 md:mt-0 md:ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-200 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Contato
                    </Link>
                </nav>
            </div>
        </header>
    );
};

interface NavLinkProps {
    to: string;
    icon: string;
    label: string;
    isActive: boolean;
}

const NavLink = ({ to, icon, label, isActive }: NavLinkProps) => (
    <Link
        to={to}
        className={`
            group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
            ${isActive 
                ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 font-medium shadow-md' 
                : 'text-gray-700 hover:bg-blue-50 md:hover:scale-105'
            }
        `}
    >
        <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-500 group-hover:text-purple-500'}`} 
             fill="none" 
             stroke="currentColor" 
             viewBox="0 0 24 24"
        >
            {icon.split(' ').map((d, i) => (
                <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2.5 : 2} d={d} />
            ))}
        </svg>
        <span>{label}</span>
    </Link>
);

export default Header;