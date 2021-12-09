import { Coupon } from "../src/Coupon";

describe('Coupon Tests', () => {
  it('should be create valid coupon', () => {
    const coupon = new Coupon('VALE10', 10, new Date('2020-12-10'));
    const today = new Date('2020-12-01');
    expect(coupon.isValid(today)).toBeTruthy();
  });
  it('should be create invalid coupon', () => {
    const coupon = new Coupon('VALE10', 10, new Date('2020-12-10'));
    const today = new Date('2020-12-11');
    expect(coupon.isExpired(today)).toBeTruthy();
  });
  it('should be create valid coupon and calculate discount', () => {
    const coupon = new Coupon('VALE10', 10);
    const discount = coupon.calculateDiscount(1000);
    expect(discount).toBe(100);
  });
});
