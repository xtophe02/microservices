import { Listener, OrderCancelledEvent, Subjects } from "@cmtickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/tickets-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const { ticket } = data;
    const findTicket = await Ticket.findById(ticket.id);
    if (!findTicket) {
      throw new Error("Ticket not found");
    }
    findTicket.set({ orderId: undefined });
    await findTicket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: findTicket.id,
      price: findTicket.price,
      title: findTicket.title,
      userId: findTicket.userId,
      orderId: findTicket.orderId,
      version: findTicket.version,
    });
    msg.ack();
  }
}
