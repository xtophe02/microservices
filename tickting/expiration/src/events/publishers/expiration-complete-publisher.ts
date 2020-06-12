import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@cmtickets/common";

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete;
}
