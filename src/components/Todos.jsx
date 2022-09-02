// hooks
import { useTodoContext } from '../hooks/useTodoContext';
import { useUserContext } from '../hooks/useUserContext';
// components
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default function Todos() {
    const { user } = useUserContext();
    const { todos, error, loading } = useTodoContext();

    return (
        <div>
            {error && <p>{error.message}</p>}
            {loading && <p className='loader'>Loading..</p>}
            {user && <TodoForm />}
            {todos.length > 0 && !loading && <TodoList />}
        </div>
    );
}