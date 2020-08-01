const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  empId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
  },
  joinDate: {
    type: Date,
  },
  mobileNo: {
    type: String,
  },
});
module.exports = employee = mongoose.model("employee", EmployeeSchema);
