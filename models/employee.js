const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({

  email: {
    type: String,
  },
  password: {
    type: String,
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
    type: String,
  },
  mobileNo: {
    type: String,
  },
  status: {
    type: String
  },
  calendarAccess: {
    type: Object
  }
});
module.exports = employee = mongoose.model("employee", EmployeeSchema);
