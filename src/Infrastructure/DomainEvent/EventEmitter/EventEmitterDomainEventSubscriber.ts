import EventEmitterClient from './EventEmitterClient';
import { DomainEvent } from 'Domain/shared/DomainEvent/DomainEvent';
import { IDomainEventSubscriber } from 'Application/shared/DomainEvent/IDomainEventSubscriber';
import { container } from 'tsyringe';

export class EventEmitterDomainEventSubscriber
  implements IDomainEventSubscriber
{
  subscribe<T extends Record<string, unknown>>(
    eventName: string,
    callback: (event: DomainEvent<T>) => void
  ) {
    container
      .resolve(EventEmitterClient)
      .eventEmitter.once(eventName, callback);
  }
}
