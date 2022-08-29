const mongoose = require("mongoose");
const { Schema } = mongoose;

const PageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  pageNr: {
    type: Number,
    required: true,
  }
});

module.exports  = mongoose.model('Page', PageSchema);

