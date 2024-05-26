export const updateStatusMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    
  const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

  if (action.type === 'todos/toggled') {
    const updatedTodos = existingTodos.map((todo) =>
      todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  return result;
};
