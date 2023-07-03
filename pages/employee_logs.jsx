import React, { useState, useEffect } from 'react';

const EmployeeLogs = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    employee_id: '',
    date: '',
    time_in: '',
    time_out: '',

  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/endpoint');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setFormData(item);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/endpoint/${selectedItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form updated successfully');
        fetchData();
      } else {
        console.error('Error updating form data:', response.status);
        // Handle error case
      }
    } catch (error) {
      console.error('Error updating form data:', error);
      // Handle error case
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`/api/endpoint/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchData();
        console.log('Form deleted successfully');
      } else {
        console.error('Error deleting form data:', response.status);
        // Handle error case
      }
    } catch (error) {
      console.error('Error deleting form data:', error);
      // Handle error case
    }
  };
  const sortDataById = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      return b._id.localeCompare(a._id);
    });
    return sortedData;
  };

  return (
    <div className='emp_container'>
      <h1>Employee Logs</h1>
      <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>EmployeeID</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over the data and display rows */}
          {sortDataById(data).map((item)=> (
            <tr key={item._id}>
              <td>{item.employee_id}</td>
              <td>{item.date}</td>
              <td>{item.time_in}</td>
              <td>{item.time_out}</td>
              <td>{item.status}</td>
              <td>{item.feedback}</td>
              <td>
                <button onClick={() => handleEditClick(item)}>update</button>
                <button onClick={() => handleDeleteClick(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form */}

      <div className="emp_form">
      <form >
        <h3>Employee ID: {formData.employee_id}</h3>
        {/* <label htmlFor="id">employee_id</label> */}
        {/* <input
          id="id"
          type="text"
          name="name"
        value={formData.employee_id || ''}
          onChange={handleInputChange}
        /> */}
        <br />
          <label htmlFor="date">Calendar</label>
        <input
          id='date'
          type="date"
          name="date"
          value={formData.date || ''}
          onChange={handleInputChange}
        />
        <br />
        <br />
        
        <p>Time In</p>
        <input
          type="time"
          name="time_in"
          value={formData.time_in|| '' }
          onChange={handleInputChange}
        />
        <br />
        <br />
        <p>Time Out</p>
        <input
          type="time"
          name="time_out"
          value={formData.time_out|| ''}
          onChange={handleInputChange}
        />
        <br />
        <button  onClick={handleFormSubmit} type="submit">Save</button>
      </form>
      </div>
    </div>
  );
};

export default EmployeeLogs;
