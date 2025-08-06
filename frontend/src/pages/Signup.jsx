import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({
      name: '',
      email: '',
      password: ''
  });

  const [ showPassword, setShowPassword ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const handleChange = (e)=>{
      setFormData({ ...formData, [ e.target.name ]: e.target.value });
  };

  const togglePassword = () =>{
      setShowPassword((prev)=> !prev);
  };

  const handleSubmit = async (e)=>{
      e.preventDefault();

      console.log(formData);

      setLoading(true);

      try {
        const res = await axios.post('http://localhost:3000/auth/register', formData);
        toast.success('Signup successful! Please login.');
        navigate('/login');
      } catch (err) {
        const message = err.response?.data?.message || 'Signup failed. Try again.';
        toast.error(message);
      } finally {
        setLoading(false);
      }
  };
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password with toggle */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 px-3 text-sm text-gray-600 dark:text-gray-300 focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          {/* Link to Login */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup