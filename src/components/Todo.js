import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import {
  colorSelected,
  deleted,
  toggled,
  textEdited,
  dateSelected,
} from '../redux/todos/actions';
import { remainingTime } from '@/utils/remainingTime';
import TimePicker from './TimePicker';

export default function Todo({ todo, currentEditingId, setCurrentEditingId }) {
  const dispatch = useDispatch();

  const { text, id, completed, color, time } = todo;

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(time || '');
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (currentEditingId !== id) {
      setIsEditing(false);
      setShowTimePicker(false);
    }
  }, [currentEditingId, id]);

  useEffect(() => {
    let intervalId;
    if (isHovered) {
      intervalId = setInterval(() => {
        setNotification((prevNotification) => !prevNotification);
      }, 1000);
    } else {
      clearInterval(intervalId);
      setNotification(false);
    }

    return () => clearInterval(intervalId);
  }, [isHovered]);

  const { message, color: warningColor } = remainingTime(time);

  const handleStatusChange = (todoId) => {
    dispatch(toggled(todoId));
  };

  const handleColorChange = (todoId, color) => {
    dispatch(colorSelected(todoId, color));
  };

  const handleDelete = (todoId) => {
    dispatch(deleted(todoId));
  };

  const handleEdit = () => {
    if (editedText.trim() !== '') {
      dispatch(textEdited(id, editedText));
      setIsEditing(false);
      setCurrentEditingId(null);
      if (selectedTime) {
        dispatch(dateSelected(id, selectedTime));
      }
      return;
    }
    alert('Empty input!');
  };

  const handleShowTimePicker = () => {
    setShowTimePicker(true);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleCancel = () => {
    setEditedText(text);
    setIsEditing(false);
    setCurrentEditingId(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleEdit();
      return;
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleDoubleClick = () => {
    setCurrentEditingId(id);
    setIsEditing(true);
  };

  return (
    <div
      className={`relative flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0 ${
        warningColor === 'green'
          ? 'bg-green-100 hover:bg-green-200'
          : warningColor === 'gray'
          ? 'bg-gray-100 hover:bg-gray-200'
          : warningColor === 'red'
          ? 'bg-red-100 hover:bg-red-200'
          : ''
      }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={handleDoubleClick}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none">
        {isHovered && !isEditing && !showTimePicker && (
          <>
            <div
              className={`${
                warningColor === 'gray'
                  ? 'opacity-50 text-[16px]'
                  : warningColor === 'green'
                  ? 'text-green-700 text-[16px]'
                  : warningColor === 'red'
                  ? 'text-red-700 text-[16px]'
                  : ''
              }`}
              style={{ display: !notification ? 'block' : 'none' }}
            >
              {message}
            </div>
            <div
              className="text-gray-600 text-xs"
              style={{ display: notification ? 'block' : 'none' }}
            >
              Click twice to edit
            </div>
          </>
        )}
      </div>

      <div className="relative">
        <div
          className={`rounded-full bg-white border-2 w-5 h-5 flex justify-center items-center mr-2 ${
            completed ? 'border-green-500' : 'border-gray-400'
          }`}
        >
          <input
            type="checkbox"
            checked={completed}
            onChange={() => handleStatusChange(id)}
            className="opacity-0 absolute rounded-full"
          />
          {completed && (
            <svg
              className="fill-current w-3 h-3 text-green-500 pointer-events-none"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </div>
      </div>

      <div className={'flex-1'}>
        {isEditing ? (
          <div className="flex items-center flex-1 space-x-2">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full border border-gray-400 rounded px-2 py-1 pr-16"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white py-[0.3] px-3 rounded-md shadow-md hover:bg-blue-600 transition-colors"
                onClick={handleShowTimePicker}
              >
                {!showTimePicker && <span className="text-sm">Set Time</span>}
              </button>
            </div>
            <button
              className={`px-2 py-1 rounded ${
                editedText === text && !selectedTime
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-700'
              }`}
              onClick={handleEdit}
              disabled={editedText === text && !selectedTime}
            >
              Update
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            className={`select-none ${completed && 'line-through'} ${
              warningColor === 'gray' && 'opacity-50'
            }`}
          >
            {text}
          </div>
        )}

        {isEditing && (
          <>
            {showTimePicker && (
              <TimePicker
                onTimeChange={handleTimeChange}
                initialValue={selectedTime}
                handleKeyDown={handleKeyDown}
              />
            )}
          </>
        )}
      </div>

      {isHovered && !isEditing && (
        <button
          className="text-blue-500 hover:text-blue-700 ml-2"
          onClick={() => {
            setCurrentEditingId(id);
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      )}

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-600 border-green-600 ${
          color === 'green' && 'bg-green-600'
        }`}
        title={'most priority'}
        onClick={() => handleColorChange(id, 'green')}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-600 border-yellow-600 ${
          color === 'yellow' && 'bg-yellow-600'
        }`}
        title={'medium priority'}
        onClick={() => handleColorChange(id, 'yellow')}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-600 border-red-600 ${
          color === 'red' && 'bg-red-600'
        }`}
        title={'less priority'}
        onClick={() => handleColorChange(id, 'red')}
      ></div>

      <Image
        width={10}
        height={10}
        src="/images/cancel.png"
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
        onClick={() => handleDelete(id)}
      />
    </div>
  );
}
