import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import AllUrls from './pages/AllUrls';
import Navbar from './components/Navbar';

function App(){
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white'>
      <Router>
        <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/all-urls' element={<AllUrls />} />
            </Routes>
      </Router>
    </div>
  )
}

export default App;