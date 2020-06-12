import {
  Listener,
  OrderCancelledEvent,
  Subjects,
  OrderStatus,
} from "@cmtickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    //can't be a findbyId, we need id and version
    const order = await Order.findByIdAndPreviousVersion(data);
    if (!order) {
      throw new Error("Order not found");
    }
    order.set({ status: OrderStatus.Cancelled });
    await order.save();
    msg.ack();
  }
}
