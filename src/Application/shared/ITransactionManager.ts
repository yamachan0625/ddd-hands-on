export interface ITransactionManager {
  begin<T>(callback: () => Promise<T>): Promise<T | undefined>;
}
