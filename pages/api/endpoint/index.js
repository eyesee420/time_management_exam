import connectToDatabase from '../../../utils/mongodb';
import FormData from '../../../model/FormData';

    export default async function handler(req, res) {
        if (req.method === 'POST') {
          // Handle form submission
          try {
            await connectToDatabase();
      
            const { employee_id, date, time, timeLogs ,time_in, time_out, status, feedback } = req.body;
  
            console.log('Received Form Data:');
      
            const formData = new FormData({
              // _id,
              employee_id,
              
              // date,
              // time,
              // time_in,
              // time_out,
              // status,
              // feedback,
            });
      
      
            // Save the form data to the database
            await formData.save();
      
            res.status(200).json({ message: 'Form data saved successfully' });
          } catch (error) {
            console.error('Error saving form data:', error);
            res.status(500).json({ error: 'An error occurred while saving the form data' });
          }
          // ...
        } else if (req.method === 'GET') {
          // Handle fetching form data
          try {
            await connectToDatabase();
      
            // Retrieve all form data from the database
            const formData = await FormData.find({});
      
            res.status(200).json(formData);
          } catch (error) {
            console.error('Error fetching form data:', error);
            res.status(500).json({ error: 'An error occurred while fetching form data' });
          }
        }
    }

