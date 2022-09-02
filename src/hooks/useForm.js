import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (e) => {
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        callback();
        setValues(initialState);
    };

    return { values, onChange, onSubmit };
};