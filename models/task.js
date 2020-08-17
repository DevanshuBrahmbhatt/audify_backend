const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({

  name: {
    type: String,
  },
  description: {
    type: String,
  },
  assignee: {
    type: String,
  },
  assign_to: {
    type: String,
  },
  status: {
    type: String,
  },
},
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = task = mongoose.model("task", TaskSchema);
