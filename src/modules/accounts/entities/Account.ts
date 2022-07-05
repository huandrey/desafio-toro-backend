import { v4 as uuidV4 } from "uuid";

export class Account {
  id!: string;

  bank!: string;

  agency_number!: string;

  account_number!: string;

  fk_id_user!: string;

  balance!: number;

  created_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.created_at = new Date();
  }
}
