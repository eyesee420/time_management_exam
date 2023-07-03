import connectToDatabase from '../../../utils/mongodb';
import FormData from '../../../model/FormData';


    export default async function handler(req, res) {
        const {
          query: { id },
          method,
        } = req;
      
        if (method === 'PUT') {
          try {
            // Update logic
            await connectToDatabase();
    
          const { date, time_in_val ,time_out_val , time_in, time_out  ,status ,feedback} = req.body;
    
          // Find the document in the database based on the provided id
          const formData = await FormData.findById(id);
    
          if (!formData) {
            return res.status(404).json({ error: 'Form data not found' });
          }
    
          // Update the fields with the new values
          formData.date = date;
          formData.time_in = time_in;
          formData.time_out = time_out;
          // formData.timeLogs = timeLogs;
          formData.status = status;
          formData.feedback = feedback;
    
          // Save the updated document
          await formData.save();
          console.log('Form data updated successfully');
          res.status(200).json({ message: 'Form data updated successfully' });
          } catch (error) {
            console.error('Error updating form data:', error);
            res.status(500).json({ error: 'An error occurred while updating the form data' });
          }
        } else if (method === 'DELETE') {
            try {
                await connectToDatabase();
          
                // Find the document in the database based on the provided id
                const formData = await FormData.findById(id);
          
                if (!formData) {
                  return res.status(404).json({ error: 'Form data not found' });
                }
          
                // Delete the document from the database
                await FormData.deleteOne({ _id: id });
          
                res.status(200).json({ message: 'Form data deleted successfully' });
              } catch (error) {
                console.error('Error deleting form data:', error);
                res.status(500).json({ error: 'An error occurred while deleting the form data' });
              }
            } else {
              res.status(405).json({ error: 'Method not allowed' });
            }
      }