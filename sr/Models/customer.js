import mongoose from "mongoose";
const customerData = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    validate: {
      validator: function(v) {
        // This regex will match mobile numbers of 10 digits
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  service: {
    type: String,
  
  },

  amount: {
    type: String,
    
  },
  paymentmethod: {
    type: String,
    required:true
  },
  productname: {
    type: String
  },
  productamount: {
    type: String
  },
  productquantity: {
    type: String
  },
  customerfeedback: {
    type: String
  },
  currentdate: {
    type: String,
    required: true
  }
},
{
  timestamps:true
});
//userdetail is the modelname.using these userdetail we can able to create,read,update,delete datas in userdetails collection
const customer = mongoose.model("customers", customerData);

export default customer;
