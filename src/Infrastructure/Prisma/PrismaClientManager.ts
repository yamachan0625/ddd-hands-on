import { Prisma, PrismaClient } from '@prisma/client';
import prisma from './prismaClient';
import { IClientManager } from 'Infrastructure/shared/IClientManager';

export class PrismaClientManager
  implements IClientManager<PrismaClient | Prisma.TransactionClient>
{
  private client: PrismaClient | Prisma.TransactionClient = prisma;

  setClient(client: Prisma.TransactionClient): void {
    this.client = client;
  }

  getClient() {
    return this.client;
  }
}
