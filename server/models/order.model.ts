import mongoose, { Model, Schema } from "mongoose";
import { IOrder } from "../interfaces/model.interfaces";

const orderSchema = new Schema<IOrder>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Object,
      // required: true,
    },
  },
  { timestamps: true }
);

const OrderModel: Model<IOrder> = mongoose.model("Order", orderSchema);
export default OrderModel;
