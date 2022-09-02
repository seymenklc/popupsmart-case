import { useEffect, useState } from 'react';
// config
import { baseUri } from '../api';

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getTodos = async () => {
        try {
            setLoading(true);

            const response = await fetch(baseUri);
            const data = await response.json();

            setLoading(false);
            setTodos(data);
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
            setTodos(prevTodos => (
                prevTodos.map(todo => {
                    if (id === todo.id) {
                        return { ...todo, isCompleted: !todo.isCompleted };
                    }
                    return todo;
                })
            ));
        } catch (error) {
            setLoading(false);
            setError(err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(baseUri + `/${id}`, { method: 'DELETE' });
            setTodos(prevTodos => (
                prevTodos.filter(todo => todo.id !== id)
            ));
        } catch (error) {
            setLoading(false);
            setError(err);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return {
        todos,
        error,
        loading,
        addTodo,
        toggleTodo,
        deleteTodo
    };
};