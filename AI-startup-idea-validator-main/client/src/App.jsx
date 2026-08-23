import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Validate from './pages/Validate';
import Results from './pages/Results';
import History from './pages/History';

function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/validate" element={<Validate />} />
                <Route path="/results/:id" element={<Results />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
