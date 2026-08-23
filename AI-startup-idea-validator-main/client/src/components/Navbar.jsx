import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar glass-card">
            <Link to="/" className="logo">
                <span className="logo-icon">🚀</span>
                <span className="logo-text">StartupValidator</span>
            </Link>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/validate" className="nav-link">Validate</Link>
                <Link to="/history" className="nav-link">History</Link>
                <button
                    onClick={toggleTheme}
                    className="theme-toggle"
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.25rem',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        marginLeft: '0.5rem'
                    }}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
