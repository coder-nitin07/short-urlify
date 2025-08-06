import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle'; // Adjusted path for clarity
import axios from 'axios';

// --- SVG Icon for the Mobile Menu ---
const MenuIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const Navbar = () => {
  // --- All original logic and state management are preserved below ---
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    setMenuOpen(false); // close menu on route change
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error('Logout error:', err.response?.data?.message || err.message);
    } finally {
      localStorage.removeItem('token');
      setToken('');
      navigate('/login');
    }
  };
  // --- End of original logic section ---

  // --- NavLink Component for consistent styling ---
  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive(to)
          ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white'
          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
      }`}
    >
      {children}
    </Link>
  );

  const MobileNavLink = ({ to, children }) => (
    <Link
        to={to}
        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
    >
        {children}
    </Link>
  );


  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={token ? "/home" : "/login"} className="text-xl font-bold text-neutral-900 dark:text-white">
              ShortUrliFy
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {token ? (
              <>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/all-urls">All URLs</NavLink>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/signup">Signup</NavLink>
                <NavLink to="/login">Login</NavLink>
              </>
            )}
            <div className="pl-2">
                <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-neutral-200 dark:border-neutral-800">
            {token ? (
              <>
                <MobileNavLink to="/home">Home</MobileNavLink>
                <MobileNavLink to="/all-urls">All URLs</MobileNavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/signup">Signup</MobileNavLink>
                <MobileNavLink to="/login">Login</MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;