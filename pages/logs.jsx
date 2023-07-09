import React, { useState, useEffect } from 'react';

const Logs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cachedData = localStorage.getItem('Process_Logs_Cache');
      if(cachedData){
        setData(JSON.parse(cachedData));
      }
      const response = await fetch('/api/logs');
      const jsonData = await response.json();
      setData(jsonData);
      localStorage.setItem('Process_Logs_Cache', JSON.stringify(jsonData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const calculateUndertime = (timeIn, timeOut) => {
    const timeInMinutes = convertToMinutes(timeIn);
    const timeOutMinutes = convertToMinutes(timeOut);
    const totalMinutes = timeOutMinutes - timeInMinutes;
    const undertimeMinutes = Math.max(480 - totalMinutes, 0); // Maximum of 8 hours (480 minutes)
  
    return undertimeMinutes > 0 ? formatMinutes(undertimeMinutes) : '';
  };
  
  const calculateOvertime = (timeIn, timeOut) => {
    const timeInMinutes = convertToMinutes(timeIn);
    const timeOutMinutes = convertToMinutes(timeOut);
    const totalMinutes = timeOutMinutes - timeInMinutes;
    const overtimeMinutes = Math.max(totalMinutes - 480, 0); // Maximum of 8 hours (480 minutes)

    return overtimeMinutes > 0 ? formatMinutes(overtimeMinutes) : '';
  };

  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hours ${remainingMinutes} minutes`;
  };

  const sortDataById = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      return b._id.localeCompare(a._id);
    });
    return sortedData;
  };

  return (
    <div className='log_container'>
      <h1>Approved Logs</h1>
          <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Log Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Late</th>
            <th>Undertime</th>
            <th>Overtime</th>
          </tr>
        </thead>
        <tbody>
          {/* Sort the data by ID */}
          {sortDataById(data).map((item) => (
            <tr key={item._id}>
              <td>{item.employee_id}</td>
              <td>{item.date}</td>
              <td>{item.time_in}</td>
              <td>{item.time_out}</td>
              <td></td>
              <td>{calculateUndertime(item.time_in, item.time_out)}</td>
              <td>{calculateOvertime(item.time_in, item.time_out)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
