import { Publisher, Subjects, TicketCreatedEvent } from "@cmtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
