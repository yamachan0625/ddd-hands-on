export interface ITransactionManager {
  run<T>(callback: () => Promise<T>): Promise<T>;
}
