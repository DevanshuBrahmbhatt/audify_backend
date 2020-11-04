const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GitStatSchema = new Schema({
    repository: {
        type: String,
    },
    owner: {
        type: String,
    },
    operator: {
        type: String,
    },
    created_at: {
        type: String,
    },
    error_message: {
        type: String,
    },
});
module.exports = gitStat = mongoose.model("gitStat", GitStatSchema);