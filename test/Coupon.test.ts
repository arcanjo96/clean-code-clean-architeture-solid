import { Coupon } from "../src/Coupon";

describe('Coupon Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2021-01-01').getTime());
  });
  it('should be not able create coupon with expired date', () => {
    expect(() => new Coupon('VALE10', 10, new Date())).toThrowError('Expired coupon');
  });
});
