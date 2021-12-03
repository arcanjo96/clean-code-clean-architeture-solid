class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expirationDate: Date
  ) {
    if (!this.validate()) throw new Error("Expired coupon");
  }

  validate(): boolean {
    return this.expirationDate > new Date();
  }
}
export { Coupon };
