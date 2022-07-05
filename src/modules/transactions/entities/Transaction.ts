import { v4 as uuidV4 } from "uuid";

export class Transaction {
  id!: string;

  source_bank!: string;

  source_branch!: string;

  source_cpf!: string;

  target_account_id!: string;

  amount!: number;

  created_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.created_at = new Date();
  }
}
