import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide Category Name"],
      trim: true,
      maxLength: [
        120,
        "Colelction name should no tbe more than 120 characters",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);
