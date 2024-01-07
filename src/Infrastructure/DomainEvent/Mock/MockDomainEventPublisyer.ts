import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/IDomainEventPublisher';
import { DomainEvent } from 'Domain/shared/DomainEvent/DomainEvent';

export class MockDomainEventPublisher implements IDomainEventPublisher {
  publish(domainEvent: DomainEvent) {
    domainEvent;
  }
}
