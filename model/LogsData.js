import mongoose from 'mongoose';

// import mongoose from 'mongoose';

// Check if the FormData model is already defined
const LogsDataSchema = mongoose.models.LogsData
  ? mongoose.model('LogsData').schema
  : new mongoose.Schema({
      // Define the schema fields for FormData
      // _id: {
      //   type: String,
      //   required: true,
      // },
      employee_id: {
        type: String,
        // required: true,
      },
      date: {
        type: String,

      },
      time_in:{
        type: String,
        
      },
      time_out:{
        type: String,
       
      },

      status: {
        type: String,
        default: '',
      },
      feedback: {
        type: String,
        default: '',
      },
    });

// Export the FormData model
export default mongoose.models.LogsData || mongoose.model('LogsData', LogsDataSchema);
