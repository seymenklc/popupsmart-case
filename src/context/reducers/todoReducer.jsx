export const todoReducer = (state, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return {
                ...state,
                todos: action.payload
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (action.payload.id === todo.id) {
                        return { ...todo, isCompleted: !todo.isCompleted };
                    }
                    return todo;
                })
            };
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (action.payload.id === todo.id) {
                        return { ...todo, content: action.payload.edited };
                    }
                    return todo;
                })
            };
        case 'TOGGLE_EDIT_MODE':
            const idx = state.todos.findIndex(todo => todo.id === action.payload.id);
            return {
                ...state,
                todo: state.todos[idx],
                isEditing: !state.isEditing,
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)
            };
        default:
            return state;
    }
};