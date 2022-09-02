import { createContext, useReducer } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { userReducer } from './reducers/userReducer';

const UserContext = createContext({
    user: null,
    login: (displayName) => { },
    logout: () => { }
});

const UserProvider = (props) => {
    const [state, dispatch] = useReducer(userReducer, { user: null });

    const [_, setLsVal] = useLocalStorage('user', { displayName: '' });

    const login = (displayName) => {
        dispatch({ type: 'LOGIN', payload: displayName });
        setLsVal({ user: { displayName } });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <UserContext.Provider value={{ ...state, login, logout }}>
            {props.children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };