import { DomainEvent } from 'Domain/shared/DomainEvent/DomainEvent';

export interface IDomainEventPublisher {
  publish(domainEvent: DomainEvent): void;
}
