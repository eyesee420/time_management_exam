import React, { useState } from 'react';

const User = () => {
  const [employee_id, setEmpID] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [timeLogType, setTimeLogType] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      employee_id,
      date,
      time,
      time_in: timeLogType === 'time in' ? 'time in' : '',
      time_out: timeLogType === 'time out' ? 'time out' : '',
      status: 'Pending',
      feedback: '',
    };

    try {
      // Send the form data to the API endpoint
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful form submission
        console.log('Form submitted successfully');
        // Clear the form fields
        setEmpID('');
        setDate('');
        setTime('');
        setTimeLogType('');
      } else {
        // Handle form submission error
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={employee_id}
          onChange={(e) => setEmpID(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div>
        <label>Time Log Type:</label>
        <div>
          <label>
            <input
              type="radio"
              name="timeLogType"
              value="time in"
              checked={timeLogType === 'time in'}
              onChange={(e) => setTimeLogType(e.target.value)}
            />
            Time In
          </label>
          <label>
            <input
              type="radio"
              name="timeLogType"
              value="time out"
              checked={timeLogType === 'time out'}
              onChange={(e) => setTimeLogType(e.target.value)}
            />
            Time Out
          </label>
        </div>
      </div>
      <button type="button" onClick={handleFormSubmit}>
        Submit
      </button>
    </form>
  );
};

export default User;
