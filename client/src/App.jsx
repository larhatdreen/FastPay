import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import Login from './Pages/Login/Login';
import Header from './Components/Header/Header';
import Dashboard from './Pages/Dashboard/Dashboard';
import Finance from './Pages/Finance/Finance';
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

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />
  }

  return (
    <BrowserRouter>
    <div className="App">
     {isAuthenticated && showHeader && <Header windowWidth={windowWidth} />}
        <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard windowWidth={windowWidth} /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><NotFound setShowHeader={setShowHeader} /></PrivateRoute>} />
            <Route path="/finance" element={<PrivateRoute><Finance /></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><NotFound setShowHeader={setShowHeader} /></PrivateRoute>} />
            <Route path="/applications" element={<PrivateRoute><NotFound setShowHeader={setShowHeader} /></PrivateRoute>} />
            <Route path="/disputes" element={<PrivateRoute><NotFound setShowHeader={setShowHeader} /></PrivateRoute>} />
            <Route path="/details" element={<PrivateRoute><NotFound setShowHeader={setShowHeader} /></PrivateRoute>} />
            <Route path="/devices" element={<PrivateRoute><NotFound setShowHeader={setShowHeader} /></PrivateRoute>} />
            <Route path="/merchants" element={<PrivateRoute><NotFound setShowHeader={setShowHeader} /></PrivateRoute>} />
            <Route path="/profit" element={<PrivateRoute><NotFound setShowHeader={setShowHeader} /></PrivateRoute>} />
            <Route path="/statistics" element={<PrivateRoute><NotFound setShowHeader={setShowHeader} /></PrivateRoute>} />
            <Route path="*" element={<PrivateRoute><NotFound setShowHeader={setShowHeader} /></PrivateRoute>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
