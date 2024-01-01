import { nanoid } from 'nanoid';

export class DomainEvent<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  private constructor(
    public readonly eventId: string,
    // イベントの内容
    public readonly eventBody: T,
    // イベントの名前
    public readonly eventName: string,
    // イベントの発生時刻
    public readonly occurredOn: Date
  ) {}

  static create<T extends Record<string, unknown> = Record<string, unknown>>(
    eventBody: T,
    eventName: string
  ): DomainEvent<T> {
    return new DomainEvent(nanoid(), eventBody, eventName, new Date());
  }

  static reconstruct<T extends Record<string, unknown>>(
    eventId: string,
    eventBody: T,
    eventName: string,
    occurredOn: Date
  ): DomainEvent<T> {
    return new DomainEvent(eventId, eventBody, eventName, occurredOn);
  }
}
