const mongoose = require('mongoose');

const subProperty = new mongoose.Schema({
    propertyTypeId: {
        type: mongoose.Types.ObjectId
    },
    subPropertyType: {
        type: String
    }
})

const model = mongoose.model("subProperty", subProperty)
module.exports = model