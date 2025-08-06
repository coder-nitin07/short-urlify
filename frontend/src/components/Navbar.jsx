import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import axios from 'axios';

const Navbar = () => {
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

  return (
    <nav className="flex justify-between items-center px-6  bg-gray-100 dark:bg-gray-800 shadow relative">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">ShortUrliFy</h1>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-4">
        {token ? (
          <>
            <Link
              to="/home"
              className={`transition-colors duration-500 
              hover:text-blue-600 dark:hover:text-blue-400 
              ${isActive('/home') ? 'font-bold text-blue-700 dark:text-blue-300' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/all-urls"
              className={`transition-colors duration-500 
              hover:text-blue-600 dark:hover:text-blue-400 
              ${isActive('/all-urls') ? 'font-bold text-blue-700 dark:text-blue-300' : ''}`}
            >
              All URLs
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 dark:text-red-400 hover:underline font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className={`transition-colors duration-500 
              hover:text-blue-600 dark:hover:text-blue-400 
              ${isActive('/signup') ? 'font-bold text-blue-700 dark:text-blue-300' : ''}`}
            >
              Signup
            </Link>
            <Link
              to="/login"
              className={`transition-colors duration-500 
              hover:text-blue-600 dark:hover:text-blue-400 
              ${isActive('/login') ? 'font-bold text-blue-700 dark:text-blue-300' : ''}`}
            >
              Login
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>

      {/* Mobile Nav */}
      <div className="flex md:hidden items-center">
        <div className="mr-2 -ml-[3px]">
          <ThemeToggle />
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none text-gray-800 dark:text-white"
        >
          {/* Hamburger icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-md z-50 py-2 flex flex-col space-y-2 md:hidden">
          {token ? (
            <>
              <Link
                to="/home"
                className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                Home
              </Link>
              <Link
                to="/all-urls"
                className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                All URLs
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;