import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Pages/Login/Login';
import Header from './Components/Header/Header';
import Dashboard from './Pages/Dashboard/Dashboard';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
     {isAuthenticated && <Header />}
        <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><NotFound /></PrivateRoute>} />
            <Route path="/finance" element={<PrivateRoute><NotFound /></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><NotFound /></PrivateRoute>} />
            <Route path="/applications" element={<PrivateRoute><NotFound /></PrivateRoute>} />
            <Route path="/disputes" element={<PrivateRoute><NotFound /></PrivateRoute>} />
            <Route path="/details" element={<PrivateRoute><NotFound /></PrivateRoute>} />
            <Route path="/devices" element={<PrivateRoute><NotFound /></PrivateRoute>} />
            <Route path="/merchants" element={<PrivateRoute><NotFound /></PrivateRoute>} />
            <Route path="/profit" element={<PrivateRoute><NotFound /></PrivateRoute>} />
            <Route path="/statistics" element={<PrivateRoute><NotFound /></PrivateRoute>} />
            <Route path="*" element={<PrivateRoute><NotFound /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
