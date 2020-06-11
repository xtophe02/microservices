import { Listener, TicketUpdatedEvent, Subjects } from "@cmtickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;
  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByIdAndPreviousVersion(data);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    //if I don't wnat to use the mongoose-update-if-current
    // const { title, price, version } = data;
    const { title, price } = data;
    // ticket.set({ title, price, version });
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  }
}
