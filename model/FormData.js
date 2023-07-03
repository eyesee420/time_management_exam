import mongoose from 'mongoose';

// import mongoose from 'mongoose';

// Check if the FormData model is already defined
const FormDataSchema = mongoose.models.FormData
  ? mongoose.model('FormData').schema
  : new mongoose.Schema({
      // Define the schema fields for FormData
      // _id: {
      //   type: String,
      //   required: true,
      // },
      employee_id: {
        type: String,
        required: true,
      },
      date: {
        type: String,
       
      },

      // timeLogs: {
      //   type: String,
      //   required: true,
      // },
      time_in:{
        type: String,
        
      },
      time_out:{
        type: String,
       
      },
      status: {
        type: String,
        default: 'Pending',
      },
      feedback: {
        type: String,
        default: '',
      },
    });

// Export the FormData model
export default mongoose.models.FormData || mongoose.model('FormData', FormDataSchema);


// import mongoose from 'mongoose';

// const FormDataSchema = new mongoose.Schema({
//   _id: {
//     type: String,
//     required: true,
//   },
//   employee_id: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   time: {
//     type: String,
//     required: true,
//   },
//   time_in: {
//     type: String,
//   },
//   time_out: {
//     type: String,
//   },
//   status: {
//     type: String,
//     default: 'Pending',
//   },
//   feedback: {
//     type: String,
//     default: '',
//   },
// });

// const FormData = mongoose.models.FormData || mongoose.model('FormData', FormDataSchema);

// export default FormData;
