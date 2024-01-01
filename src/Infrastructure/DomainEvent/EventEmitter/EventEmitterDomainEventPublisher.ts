import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/IDomainEventPublisher';
import EventEmitterClient from './EventEmitterClient';
import { DomainEvent } from 'Domain/shared/DomainEvent/DomainEvent';
import { container } from 'tsyringe';

export class EventEmitterDomainEventPublisher implements IDomainEventPublisher {
  publish(domainEvent: DomainEvent) {
    container
      .resolve(EventEmitterClient)
      .eventEmitter.emit(domainEvent.eventName, domainEvent);
  }
}
