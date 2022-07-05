/* eslint-disable @typescript-eslint/no-empty-function */
import { v4 as uuidV4 } from "uuid";

class User {
  id!: string;

  cpf!: string;

  first_name!: string;

  last_name!: string;

  email!: string;

  password!: string;

  created_at!: Date;

  constructor() {
    // password: string // lname: string, // fname: string, // email: string, // cpf: string,
    if (!this.id) {
      this.id = uuidV4();
    }
    this.created_at = new Date();
    // this.cpf = cpf;
    // this.fname = fname;
    // this.lname = lname;
    // this.email = email;
    // this.password = password;
    // this.created_at = new Date();
  }
}

export { User };
