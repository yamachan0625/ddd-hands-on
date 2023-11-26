export interface IDataAccessClientManager<T> {
  setClient(client: T): void;
  getClient(): T;
}
