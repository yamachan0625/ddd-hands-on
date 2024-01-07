import { DomainEvent } from 'Domain/shared/DomainEvent/DomainEvent';
import { IDomainEventSubscriber } from 'Application/shared/DomainEvent/IDomainEventSubscriber';

export class MockDomainEventSubscriber implements IDomainEventSubscriber {
  subscribe<T extends Record<string, unknown>>(
    eventName: string,
    callback: (event: DomainEvent<T>) => void
  ) {
    callback;
    eventName;
  }
}
