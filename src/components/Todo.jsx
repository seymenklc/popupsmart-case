import { useTodoContext } from "../hooks/useTodoContext";

export default function Todo({ todo }) {
    const { toggleTodo, deleteTodo, setEditMode } = useTodoContext();

    const { id, isCompleted, content } = todo;

    const handleDeleteTodo = () => deleteTodo(id);
    const handleEditTodo = () => setEditMode(id);
    const handleToggleTodo = () => toggleTodo(id, isCompleted);

    return (
        <div className={`todo ${isCompleted && 'completed'}`}>
            <p>{content}</p>
            <div className="icons">
                <div onClick={handleToggleTodo}>
                    <span class="iconify" data-icon="bi:check-lg" data-inline="false"></span>
                </div>
                <div onClick={handleEditTodo}>
                    <span class="iconify" data-icon="bi:pencil" data-inline="false"></span>
                </div>
                <div onClick={handleDeleteTodo}>
                    <span class="iconify" data-icon="bi:trash" data-inline="false"></span>
                </div>
            </div>
        </div>
    );
}