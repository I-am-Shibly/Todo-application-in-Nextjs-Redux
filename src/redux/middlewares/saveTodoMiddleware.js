export const saveTodoMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const nextTodoId = (todos) => {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), 0);
    return maxId + 1;
  };

  // saving data
  if (action.type === 'todos/added') {
    const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

    if (action.payload.trim() !== '') {
      const updatedTodos = [
        ...existingTodos,
        {
          id: nextTodoId(existingTodos),
          text: action.payload,
          completed: false,
        },
      ];
      // Save the updated todos array to localStorage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  }

  return result;
};
