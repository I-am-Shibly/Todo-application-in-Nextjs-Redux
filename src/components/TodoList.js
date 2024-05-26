'use client';

import { useDispatch, useSelector } from 'react-redux';
import Todo from './Todo';
import { useEffect, useState } from 'react';
import { fetched } from '@/redux/todos/actions';
import Footer from './Footer'; // Make sure to import Footer

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;

  useEffect(() => {
    // Dispatch action to fetch todos from localStorage when component mounts
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    dispatch(fetched(todos));
  }, [dispatch]);

  const filterByStatus = (todo) => {
    const { status } = filters;
    switch (status) {
      case 'Complete':
        return todo.completed;

      case 'Incomplete':
        return !todo.completed;

      default:
        return true;
    }
  };

  const filterByColors = (todo) => {
    const { colors } = filters;
    if (colors.length > 0) {
      return colors.includes(todo?.color);
    }
    return true;
  };

  const filteredTodos = todos
    .filter(filterByStatus)
    .filter(filterByColors)
    .filter((todo) => !!todo);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  return (
    <div>
      <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
        {currentTodos.length > 0 ? (
          currentTodos.map((todo) => <Todo todo={todo} key={todo?.id} />)
        ) : (
          <h1>No todo found!</h1>
        )}
          </div>
          
      <hr className="mt-4" />

      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
