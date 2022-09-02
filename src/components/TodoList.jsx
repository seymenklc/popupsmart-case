// hooks
import { useTodoContext } from '../hooks/useTodoContext';
// components
import Todo from './Todo';

export default function TodoList() {
    const { todos } = useTodoContext();

    return (
        <div className='todos-wrapper'>
            {todos.map(item => (
                <Todo key={item.id} todo={item} />
            ))}
        </div>
    );
}