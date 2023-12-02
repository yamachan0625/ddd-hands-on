export class MockTransactionManager {
  async begin<T>(callback: () => Promise<T>) {
    return await callback();
  }
}
