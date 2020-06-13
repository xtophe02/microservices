import { Publisher, Subjects, PaymentCreatedEvent } from "@cmtickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
