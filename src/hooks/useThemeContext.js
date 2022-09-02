import { useContext } from 'react';
import { ThemeContext } from "../context/themeContext";

export const useThemeContext = () => {
    return useContext(ThemeContext);
};