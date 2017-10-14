const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var enquirySchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  contact: {
    type: String,
    required: [true, 'Contact Information is required']
  },
  enquiry: {
  type: String,
    required: [true, 'Enquiry is required']
  }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry
