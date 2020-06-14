import mongoose from "mongoose";
import { OrderStatus } from "@cmtickets/common";
import Stripe from "stripe";

interface PaymentAttrs {
  stripeId: string;
  orderId: string;
}

//prop user Document has
interface PaymentDoc extends mongoose.Document {
  stripeId: string;
  orderId: string;
}
//methods user model has
interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    stripeId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "Payment",
  paymentSchema
);

export { Payment };
