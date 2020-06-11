import { Listener, OrderCreatedEvent, Subjects } from "@cmtickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/tickets-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { ticket, id } = data;
    const findTicket = await Ticket.findById(ticket.id);
    if (!findTicket) {
      throw new Error("Ticket not found");
    }
    findTicket.set({ orderId: id });
    await findTicket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: findTicket.id,
      price: findTicket.price,
      title: findTicket.title,
      userId: findTicket.userId,
      orderId: id,
      version: findTicket.version,
    });
    msg.ack();
  }
}
