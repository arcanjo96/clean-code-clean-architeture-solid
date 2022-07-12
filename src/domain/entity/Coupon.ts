class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expireDate?: Date
  ) { }

  isValid(today: Date = new Date()): boolean {
    if (!this.expireDate) return true;
    return this.expireDate.getTime() >= today.getTime();
  }

  isExpired(today: Date = new Date()): boolean {
    return !this.isValid(today);
  }

  calculateDiscount(amount: number, today: Date = new Date()): number {
    if (this.isExpired(today)) return 0;
    return (amount * this.percentage) / 100;
  }
}
export { Coupon };
