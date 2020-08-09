const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({

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
    type: String,
  },
  mobileNo: {
    type: String,
  },
});
module.exports = employee = mongoose.model("employee", EmployeeSchema);
