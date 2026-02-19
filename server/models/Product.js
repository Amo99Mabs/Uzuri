const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    imageURL: String,
    embedding: {
      type: [Number], // array of floats
      default: undefined,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
