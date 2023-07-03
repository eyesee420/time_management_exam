import React from 'react';

const PostButton = ({ item }) => {
  const postData = async () => {
    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      // Assuming the response indicates a successful save
      console.log('Data saved successfully:', response);
      console.log('Data saved successfully:', item);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return <button onClick={postData}>Post</button>;
};

export default PostButton;
