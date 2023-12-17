import { injectable, inject } from 'tsyringe';

import { ITransactionManager } from 'Application/shared/ITransactionManager';
import prisma from './prismaClient';
import { PrismaClientManager } from './PrismaClientManager';

@injectable()
export class PrismaTransactionManager implements ITransactionManager {
  constructor(
    @inject('IDataAccessClientManager')
    private clientManager: PrismaClientManager
  ) {}

  async begin<T>(callback: () => Promise<T>): Promise<T | undefined> {
    return await prisma.$transaction(async (transaction) => {
      this.clientManager.setClient(transaction);

      const res = await callback();
      // リセット
      this.clientManager.setClient(prisma);

      return res;
    });
  }
}
