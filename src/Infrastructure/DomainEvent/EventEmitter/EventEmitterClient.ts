import { EventEmitter } from 'events';
import { singleton } from 'tsyringe';

@singleton()
class EventEmitterClient {
  public eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }
}

export default EventEmitterClient;
