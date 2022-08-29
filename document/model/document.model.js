const mongoose = require("mongoose");
const { Schema } = mongoose;

const DocumentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date, default: Date.now, required: true
  }, pages: [

    {
      type: Schema.Types.ObjectId,
      ref: 'Page'
    }

  ]
});

module.exports = mongoose.model('Document', DocumentSchema);

