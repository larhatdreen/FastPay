import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import Login from './Pages/Login/Login';
import Header from './Components/Header/Header';
import Dashboard from './Pages/Dashboard/Dashboard';
import Profile from './Pages/Profile/Profile'
import Finance from './Pages/Finance/Finance';
import Transactions from './Pages/Transactions/Transactions'
import Applications from './Pages/Applications/Applications'
import Disputes from './Pages/Disputes/Disputes'
import Details from './Pages/Details/Details'
import Devices from './Pages/Devices/Devices'
import Merchants from './Pages/Merchants/Merchants';
import Profit from './Pages/Profit/Profit';
import Statistics from './Pages/Statistics/Statistics';
import NotFound from './Pages/NotFound/NotFound';

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
      setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return width;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const windowWidth = useWindowWidth();
  const [showHeader, setShowHeader] = useState(true)

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />
  }

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
    <div className="App">
     {isAuthenticated && showHeader && <Header windowWidth={windowWidth} />}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard windowWidth={windowWidth} /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile windowWidth={windowWidth} /></PrivateRoute>} />
            <Route path="/finance" element={<PrivateRoute><Finance /></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
            <Route path="/applications" element={<PrivateRoute><Applications /></PrivateRoute>} />
            <Route path="/disputes" element={<PrivateRoute><Disputes /></PrivateRoute>} />
            <Route path="/details" element={<PrivateRoute><Details /></PrivateRoute>} />
            <Route path="/devices" element={<PrivateRoute><Devices /></PrivateRoute>} />
            <Route path="/merchants" element={<PrivateRoute><Merchants /></PrivateRoute>} />
            <Route path="/profit" element={<PrivateRoute><Profit /></PrivateRoute>} />
            <Route path="/statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />
            <Route path="*" element={<PrivateRoute><NotFound windowWidth={windowWidth} setShowHeader={setShowHeader} /></PrivateRoute>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
