const mongoose = require('mongoose');

const tempStoreProperty = new mongoose.Schema({
    propertyId: {
        type: mongoose.Types.ObjectId
    },
    propertyStatus: {
        type: String
    }
})

const model = mongoose.model("tempStoreProperty", tempStoreProperty)
module.exports = model