import { useState } from 'react';

export default function Home() {
  const [employeeId, setEmployeeId] = useState('');

  const handleInputChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleClick = () => {
    // Create the request body
    const requestBody = {
      employee_id: employeeId,
    };

    // Send the HTTP POST request to save the employeeId
    fetch('/api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Form data saved successfully');
        } else {
          throw new Error('An error occurred while saving the form data');
        }
      })
      .catch((error) => {
        console.error('Error saving form data:', error);
      });
  };

  return (
    <>
      <div>
        <h1 className='home_page'>Home page </h1>
        <div className="user_container_main">
        <div className="user_container">
        <form>
          <label htmlFor="employee_id">Enter Employee ID</label>
          <br />
          <input
            type="text"
            id="employee_id"
            value={employeeId}
            onChange={handleInputChange}
          />
          <br />
          <button onClick={handleClick}>Submit</button>
        </form>
        </div>
        </div>
      </div>
    </>
  );
}
