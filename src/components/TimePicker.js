import React, { useEffect, useState } from 'react';

const TimePicker = ({ onTimeChange, initialValue, handleKeyDown }) => {
  const [time, setTime] = useState(initialValue || '');

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    onTimeChange(e.target.value);
  };

  return (
    <input
      onKeyDown={handleKeyDown}
      type="datetime-local"
      className="border border-gray-400 rounded px-2 py-1 mt-2"
      value={time}
      onChange={handleTimeChange}
    />
  );
};

export default TimePicker;
