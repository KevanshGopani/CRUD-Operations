import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Please enter valid code"],
    },

    discount: {
      type: Number,
      Default: 0,
    },

    active: {
      type: Boolean,
      Default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Coupon", couponSchema);
