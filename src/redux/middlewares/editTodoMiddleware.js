export const editTodoMiddleware = (store) => (next) => (action) => {
  const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

  if (action.type === 'todos/edited') {
    const { id, editedText } = action.payload;
    if (editedText.trim() !== '') {
      const updatedTodo = existingTodos.map((todo) =>
        todo.id === id ? { ...todo, text: editedText } : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodo));
    }
  }

  next(action);
};
