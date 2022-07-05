import { SourceBankDTO } from "./SourceBankDTO";
import { TargetBankDTO } from "./TargetBankDTO";

export class TransferBankDTO {
  public event: string;

  public target: TargetBankDTO;

  public origin: SourceBankDTO;

  public amount: number;

  constructor(
    event: string,
    target: TargetBankDTO,
    origin: SourceBankDTO,
    amount: number
  ) {
    this.event = event;
    this.target = target;
    this.origin = origin;
    this.amount = amount;
  }
}
