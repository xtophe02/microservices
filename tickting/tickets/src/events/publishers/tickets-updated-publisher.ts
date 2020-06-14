import { Publisher, Subjects, TicketUpdatedEvent } from "@cmtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
