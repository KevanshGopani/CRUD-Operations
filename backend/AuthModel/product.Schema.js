import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name Required"],
      trim: true,
      maxLength: [120, "Product name should be a max of 120"],
    },
    price: {
      type: Number,
      required: [true, "Product Price Required"],
      trim: true,
      maxLength: [5, "Product price should not be more than 5 digits"],
    },
    description: {
      type: String,
      //Use some form of editor - personal Assignment
    },
    photos: [
      {
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },

    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
