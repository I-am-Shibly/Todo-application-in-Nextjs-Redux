export const updateColorMiddleware = (store) => (next) => (action) => {
  const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

  if (action.type === 'todos/colorselected') {
    const updatedTodos = existingTodos.map((todo) =>
      todo.id === action.payload.todoId
        ? { ...todo, color: action.payload.color }
        : todo
    );

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  next(action);
};
