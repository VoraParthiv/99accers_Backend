const mongoose = require('mongoose');

const property = new mongoose.Schema({
    propertyType: {
        type: String
    }
})

const model = mongoose.model("property", property)
module.exports = model