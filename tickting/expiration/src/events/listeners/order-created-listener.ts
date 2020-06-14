import { Listener, OrderCreatedEvent, Subjects } from "@cmtickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //delay = when order was created - time at this moment
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("waiting this many miliseconds to process the job: ", delay);

    //add a delay on redis queue before send the ack
    await expirationQueue.add({ orderId: data.id }, { delay });
    msg.ack();
  }
}
