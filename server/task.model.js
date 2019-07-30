const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Task = new Schema({
    title: {
        type: String
    },
    isDone: {
        type: Boolean
    }
});

module.exports = mongoose.model('Task', Task);
