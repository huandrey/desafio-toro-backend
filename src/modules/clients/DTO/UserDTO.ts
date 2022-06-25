export class UserDTO {
  public cpf: string;

  public email: string;

  public fname: string;

  public lname: string;

  public password: string;

  constructor(
    cpf: string,
    email: string,
    fname: string,
    lname: string,
    password: string
  ) {
    this.cpf = cpf;
    this.email = email;
    this.fname = fname;
    this.lname = lname;
    this.password = password;
  }
}
