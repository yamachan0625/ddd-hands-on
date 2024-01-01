import { DomainEvent } from './DomainEvent';

export abstract class DomainEventStorable {
  private domainEvents: DomainEvent[] = [];

  protected addDomainEvent(domainEvent: DomainEvent) {
    this.domainEvents.push(domainEvent);
  }

  getDomainEvents(): DomainEvent[] {
    return this.domainEvents;
  }

  clearDomainEvents() {
    this.domainEvents = [];
  }
}
