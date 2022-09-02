import { useEffect, useState } from 'react';
// hooks
import { useForm } from "../hooks/useForm";
import { useTodoContext } from '../hooks/useTodoContext';

export default function TodoForm() {
    const [checked, setChecked] = useState(false);
    const [message, setMessage] = useState('');
    const [editedTodo, setEditedTodo] = useState('');

    const { addTodo, isEditing, todo, updateTodo, setEditMode } = useTodoContext();
    const { values, onChange, onSubmit } = useForm(addNewTodo, { content: '' });

    const handleToggle = () => setChecked(!checked);

    const handleUpdateTodo = () => {
        updateTodo(todo.id, editedTodo);
        setEditedTodo('');
        setEditMode(todo.id);
    };

    function addNewTodo() {
        if (values.content.trim().length >= 3) {
            const newTodo = {
                content: values.content,
                isCompleted: checked
            };
            setMessage('');
            addTodo(newTodo);
        } else {
            setMessage('Todo content must be at least 3 chars.');
        }
    }

    useEffect(() => {
        if (todo) setEditedTodo(todo.content);
    }, [isEditing]);

    return (
        <form onSubmit={onSubmit} className='todo-form'>
            {!isEditing ? (
                <>
                    <div>
                        <input
                            type="text"
                            name='content'
                            placeholder='Content'
                            onChange={onChange}
                            value={values.content}
                        />
                        <input
                            className='size'
                            type="checkbox"
                            onChange={handleToggle}
                            value={checked}
                        />
                    </div>
                    {message && <p>{message}</p>}
                    <button>add</button>
                </>
            ) : (
                <div>
                    <input
                        type="text"
                        name='content'
                        placeholder='content'
                        onChange={e => setEditedTodo(e.target.value)}
                        value={editedTodo}
                    />
                    <button onClick={handleUpdateTodo}>
                        done
                    </button>
                </div>
            )}
        </form>
    );
}