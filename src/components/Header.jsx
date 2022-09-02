import { useThemeContext } from "../hooks/useThemeContext";
import { useUserContext } from "../hooks/useUserContext";

export default function Header({ title }) {
    const { user } = useUserContext();
    const { theme, toggleTheme } = useThemeContext();

    return (
        <div className="header-wrapper">
            <h3>{title}</h3>
            <div>
                {theme === 'light' && (
                    <button onClick={toggleTheme}>
                        <span className="iconify" data-icon="bi:sun" data-inline="false"></span>
                    </button>
                )}
                {theme === 'dark' && (
                    <button onClick={toggleTheme}>
                        <span className="iconify" data-icon="bi:moon-stars" data-inline="false"></span>
                    </button>
                )}
                {user && <span>{user}</span>}
            </div>
        </div>
    );
}