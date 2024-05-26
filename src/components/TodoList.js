'use client';

import { useDispatch, useSelector } from 'react-redux';
import Todo from './Todo';
import { useEffect } from 'react';
import { fetched } from '@/redux/todos/actions';

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch action to fetch todos from localStorage when component mounts
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    dispatch(fetched(todos)); // Pass todos as the payload to the fetched action
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

  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {todos
        .filter(filterByStatus)
        .filter(filterByColors)
        .map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
    </div>
  );
}
