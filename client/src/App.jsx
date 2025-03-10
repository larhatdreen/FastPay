import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import permissions from './API/permissions.json'; // Импорт permissions.json

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

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        const debouncedHandleResize = debounce(handleResize, 300);

        window.addEventListener('resize', debouncedHandleResize);
        return () => window.removeEventListener('resize', debouncedHandleResize);
    }, []);

    return width;
};

// Проверка авторизации
const checkAuth = () => {
    const fp_type = localStorage.getItem('fp_type');
    return fp_type === "Office" || fp_type === "Merchant" || fp_type === "Admin" || fp_type === "Support";
};

// Компонент PrivateRoute с перенаправлением на NotFound
const PrivateRoute = ({ children }) => {
    const isAuthenticated = checkAuth();
    const location = useLocation(); 
    const fpType = localStorage.getItem('fp_type');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const allowedLinks = permissions[fpType]?.links.map(link => link.key) || [];
    const currentPath = location.pathname.replace('/', ''); 

    if (currentPath === '' ) {
        const defaultPath = fpType === 'Merchant' ? '/profit' : '/dashboard';
        return <Navigate to={defaultPath} replace />;
    }

    if (allowedLinks.length > 0 && !allowedLinks.includes(currentPath) && currentPath !== '') {
        return <Navigate to="/not-found" replace />; // Перенаправление на NotFound
    }

    return children;
};

function App() {
    const windowWidth = useWindowWidth();
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth);
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(checkAuth());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

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
                    <Route path="/profile" element={<PrivateRoute><Profile windowWidth={windowWidth} setIsAuthenticated={setIsAuthenticated} /></PrivateRoute>} />
                    <Route path="/finance" element={<PrivateRoute><Finance /></PrivateRoute>} />
                    <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
                    <Route path="/applications" element={<PrivateRoute><Applications /></PrivateRoute>} />
                    <Route path="/disputes" element={<PrivateRoute><Disputes windowWidth={windowWidth} /></PrivateRoute>} />
                    <Route path="/details" element={<PrivateRoute><Details /></PrivateRoute>} />
                    <Route path="/devices" element={<PrivateRoute><Devices /></PrivateRoute>} />
                    <Route path="/merchants" element={<PrivateRoute><Merchants /></PrivateRoute>} />
                    <Route path="/profit" element={<PrivateRoute><Profit windowWidth={windowWidth} /></PrivateRoute>} />
                    <Route path="/statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />
                    <Route path="/not-found" element={<NotFound windowWidth={windowWidth} setShowHeader={setShowHeader} />} />
                    <Route path="*" element={<NotFound windowWidth={windowWidth} setShowHeader={setShowHeader} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;