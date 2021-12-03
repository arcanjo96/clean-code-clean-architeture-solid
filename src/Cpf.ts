import { Validator } from "./Validator";

class Cpf implements Validator {
  constructor(private cpf: string) {
    if (!this.validate()) throw new Error("Invalid cpf");
  }

  public validate(): boolean {
    const CPF_VALID_LENGTH = 11;
    this.eliminateSpecialCharacters();
    if (!this.cpf) return false;
    if (this.cpf.length !== CPF_VALID_LENGTH) return false;
    if (this.repeatedCharacters()) return false;
    const firstDigit = this.calculateCheckDigit(this.cpf.split('', 9));
    const secondDigit = this.calculateCheckDigit(this.cpf.split('', 10));
    return this.cpf.substring(9) === `${firstDigit}${secondDigit}`;
  }

  private eliminateSpecialCharacters(): void {
    this.cpf = this.cpf.replace(/\D/g, '');
  }

  private repeatedCharacters(): boolean {
    return new Set(this.cpf.split('')).size === 1;
  }

  private calculateCheckDigit(cpf: string[]): number {
    const INITIAL_ACUMULATOR = 0;
    const total = cpf.reduce((acumulator: number, currentValue: string, index: number) => {
      return acumulator + (parseInt(currentValue) * (1 + cpf.length - index));
    }, INITIAL_ACUMULATOR);
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }
}

export { Cpf }
