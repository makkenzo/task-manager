import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
