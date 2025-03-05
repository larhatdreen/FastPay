import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

import Login from './Pages/Login/Login';
import Header from './Components/Header/Header';
import Dashboard from './Pages/Dashboard/Dashboard';
import Profile from './Pages/Profile/Profile';
import Finance from './Pages/Finance/Finance';
import Transactions from './Pages/Transactions/Transactions';
import Applications from './Pages/Applications/Applications';
import Disputes from './Pages/Disputes/Disputes';
import Details from './Pages/Details/Details';
import Devices from './Pages/Devices/Devices';
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

// Компонент для отслеживания последней страницы
const useLastPath = () => {
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== '/login') {
            localStorage.setItem('lastPath', location.pathname);
        }
    }, [location]);
};

// Проверка авторизации на основе localStorage
const checkAuth = () => {
    const fp_type = localStorage.getItem('fp_type');
    return fp_type === "Office" || fp_type === "Merchant" || fp_type === "Admin" || fp_type === "Support";
};

function App() {
    const windowWidth = useWindowWidth();
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth);
    const [showHeader, setShowHeader] = useState(true);

    // Обновление статуса авторизации при изменении localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(checkAuth());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" replace />;
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
        const lastPath = localStorage.getItem('lastPath') || '/dashboard';
        window.location.href = lastPath; // Перенаправление на последнюю страницу
    };

    return (
        <BrowserRouter>
            <div className="App">
                <LastPathTracker />
                {isAuthenticated && showHeader && <Header windowWidth={windowWidth} />}
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard windowWidth={windowWidth} /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile windowWidth={windowWidth} setIsAuthenticated={setIsAuthenticated} /></PrivateRoute>} />
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

const LastPathTracker = () => {
    useLastPath();
    return null;
};

export default App;