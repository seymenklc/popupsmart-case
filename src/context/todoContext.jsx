import { createContext, useEffect, useReducer, useState } from 'react';
import { baseUri } from '../api';
import { todoReducer } from './reducers/todoReducer';

const TodoContext = createContext({
    todos: [],
    todo: null,
    getTodos: () => { },
    addTodo: (newTodo) => { },
    toggleTodo: (id, completed) => { },
    deleteTodo: (id) => { },
    editTodo: (id, edited) => { }
});

const TodoProvider = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [state, dispatch] = useReducer(todoReducer, {
        todos: [],
        todo: null,
        isEditing: false
    });

    const getTodos = async () => {
        try {
            setLoading(true);
            const response = await fetch(baseUri);
            const data = await response.json();

            setLoading(false);
            dispatch({
                type: 'GET_TODOS',
                payload: data
            });
        } catch (err) {
            setLoading(false);
            setError(err);
        };
    };

    const addTodo = async (newTodo) => {
        try {
            const res = await fetch(baseUri, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo)
            });
            if (res.ok) getTodos();
        } catch (error) {
            setLoading(false);
            setError(err);
        }

    };

    const toggleTodo = async (id, completed) => {
        try {
            await fetch(baseUri + `/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isCompleted: !completed })
            });
            dispatch({
                type: 'TOGGLE_TODO',
                payload: { id }
            });
        } catch (error) {
            setLoading(false);
            setError(err);
        }
    };

    const updateTodo = async (id, edited) => {
        try {
            await fetch(baseUri + `/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: edited })
            });
            dispatch({
                type: 'UPDATE_TODO',
                payload: { id, edited }
            });
        } catch (error) {
            setLoading(false);
            setError(err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(baseUri + `/${id}`, { method: 'DELETE' });
            dispatch({
                type: 'DELETE_TODO',
                payload: { id }
            });
        } catch (error) {
            setLoading(false);
            setError(err);
        }
    };

    const setEditMode = (id) => {
        dispatch({
            type: 'TOGGLE_EDIT_MODE',
            payload: { id }
        });
    };

    const values = {
        getTodos, addTodo, setEditMode,
        toggleTodo, deleteTodo,
        updateTodo, loading, error
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <TodoContext.Provider value={{ ...state, ...values }}>
            {props.children}
        </TodoContext.Provider>
    );
};

export { TodoContext, TodoProvider };