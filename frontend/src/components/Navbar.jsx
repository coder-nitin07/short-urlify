import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex justify-between items-center px-6  bg-gray-100 dark:bg-gray-800 shadow">
      <h1 className="text-xl font-bold">ShortUrliFy</h1>
      <div className="flex items-center space-x-4">
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

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;