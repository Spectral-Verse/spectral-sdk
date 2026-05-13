import { Transaction } from '@stellar/stellar-sdk';

export interface TransactionBuildResult {
  xdr: string;
  transaction: Transaction;
  fee: string;
  sequence: string;
}

export interface SimulationResult {
  events: any[];
  results: any[];
  minResourceFee: string;
}
