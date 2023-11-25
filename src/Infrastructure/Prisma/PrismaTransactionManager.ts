import { ITransactionManager } from 'Application/shared/ITransactionManager';
import prisma from './prismaClient';
import { PrismaClientManager } from './PrismaClientManager';

export class PrismaTransactionManager implements ITransactionManager {
  constructor(private clientManager: PrismaClientManager) {}

  async run<T>(callback: () => Promise<T>): Promise<T> {
    return await prisma.$transaction(async (transaction) => {
      this.clientManager.setClient(transaction);

      try {
        return await callback();
      } finally {
        this.clientManager.setClient(prisma);
      }
    });
  }
}
