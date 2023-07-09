import React, { useState, useEffect } from 'react';
import PostButton from '@/components/PostButton';

const Admin = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [feedback, setFeedback] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cachedData = localStorage.getItem('Admin_Cache');
      if(cachedData){
        setData(JSON.parse(cachedData));
      }
      const response = await fetch('/api/endpoint');
      const jsonData = await response.json();
      setData(jsonData);
      localStorage.setItem('Admin_Cache', JSON.stringify(jsonData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handlePost = (item) => {
    setSelectedItem(item);
    setFeedback('');
    setSelectedStatus('');
  };

  const handleUpdate = (item) => {
    setSelectedItem(item);
    setFeedback(item.feedback);
    setSelectedStatus(item.status);
    setUser(item.employee_id)
    console.log('Selected Item:', selectedItem);
  };

  const getStatusOptions = () => {
    const statusSet = new Set();
    data.forEach((item) => {
      statusSet.add(item.status);
    });
    return Array.from(statusSet);
  };

  const handleApproveDenyChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Send the PUT request to update the data on the server
      await fetch(`/api/endpoint/${selectedItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: selectedStatus,
          feedback: feedback,
          date: selectedItem.date, // Preserve the existing date
          time_in: selectedItem.time_in, // Preserve the existing time_in
          time_out: selectedItem.time_out, // Preserve the existing time_out
        }),
      });
  
      // Update the state with the updated status and feedback
      setData((prevData) =>
        prevData.map((item) =>
          item._id === selectedItem._id
            ? { ...item, status: selectedStatus, feedback: feedback }
            : item
        )
      );
  
      // Clear the form
      setSelectedItem(null);
      setSelectedStatus('');
      setFeedback('');
  
      console.log('Data updated successfully.');
    } catch (error) {
      console.error('Error updating data:', error);
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
    <div className='admin_comtainer'>
      <h1>Admin Logs</h1>
    <br />
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
          {sortDataById(data).map((item) => (
            <tr key={item._id}>
              <td>{item.employee_id}</td>
              <td>{item.date}</td>
              <td>{item.time_in}</td>
              <td>{item.time_out}</td>
              <td>{item.status}</td>
              <td>{item.feedback}</td>
              <td>
                <button onClick={() => handleUpdate(item)}>Update</button>
                <PostButton item={item} onClick={() => handlePost(item)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

<div className="admin_form">
      <form>
        <h3 >Employee ID: {user}</h3>
        <label>
          Select Approval Status:
          <select value={selectedStatus || ''} onChange={handleApproveDenyChange}>
            <option value="">-- Select --</option>
            {getStatusOptions().map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Feedback:
          <input type="text" value={feedback} onChange={handleFeedbackChange} />
        </label>
        <br />
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
      </div>
    </div>
  );
};

export default Admin;