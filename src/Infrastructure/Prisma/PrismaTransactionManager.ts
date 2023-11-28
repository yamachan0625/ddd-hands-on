import { ITransactionManager } from 'Application/shared/ITransactionManager';
import prisma from './prismaClient';
import { PrismaClientManager } from './PrismaClientManager';

export class PrismaTransactionManager implements ITransactionManager {
  constructor(private clientManager: PrismaClientManager) {}

  async begin<T>(callback: () => Promise<T>): Promise<T | undefined> {
    return await prisma.$transaction(async (transaction) => {
      this.clientManager.setClient(transaction);

      try {
        return await callback();
      } catch (error) {
        // リトライ処理やロギング処理を入れる
      } finally {
        this.clientManager.setClient(prisma);
      }
    });
  }
}
