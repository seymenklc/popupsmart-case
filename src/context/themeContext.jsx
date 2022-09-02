import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext(null);

const ThemeProvider = (props) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(current => {
            return current === 'light' ? 'dark' : 'light';
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };