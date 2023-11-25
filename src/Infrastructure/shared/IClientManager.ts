export interface IClientManager<T> {
  setClient(client: T): void;
  getClient(): T;
}
