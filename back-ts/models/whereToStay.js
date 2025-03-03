const mongoose = require("mongoose");

const WhereToStaySchema = new mongoose.Schema({
  temple_id: { type: mongoose.Schema.Types.ObjectId, ref: "Temple", required: true },
  hotels: [
    {
      name: String,
      type: String,
      distance: String,
      price_range: String,
    }
  ]
});

module.exports = mongoose.model("WhereToStay", WhereToStaySchema);
