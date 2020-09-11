const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
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
  mobileNo: {
    type: String,
  },
  project: {
    type: String,
  },
  chat: [
    {
      message: {
        type: String,
        timestamps: true,
      },
      name: {
        type: String,
      },

    },
  ],
});
module.exports = client = mongoose.model("client", ClientSchema);
