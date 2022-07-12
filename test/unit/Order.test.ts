import { Coupon } from "../../src/domain/entity/Coupon";
import { Item } from "../../src/domain/entity/Item";
import { Order } from "../../src/domain/entity/Order";

describe('Order Tests', () => {
  const moccksCpf = {
    cpfInvalid: '12345678901',
    cpfValid: '206.161.530-90',
  };
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2021-01-01').getTime());
  });
  it('should be able create empty order with valid cpf', () => {
    const order = new Order(moccksCpf.cpfValid);
    expect(order.getTotal()).toBe(0);
  });
  it('should be able try create empty order with invalid cpf', () => {
    expect(() => new Order(moccksCpf.cpfInvalid)).toThrowError('Invalid cpf');
  });
  it('should be able create order with 3 items', () => {
    const order = new Order(moccksCpf.cpfValid);
    order.addItem(new Item(1, "Eletrônico", "Notebook", 3000), 1);
    order.addItem(new Item(2, "Eletrônico", "TV", 1500), 1);
    order.addItem(new Item(3, "Eletrônico", "Xbox", 2000), 1);
    expect(order.getTotal()).toBe(6500);
  });
  it('should be able create order with 3 items and coupon', () => {
    const order = new Order(moccksCpf.cpfValid);
    order.addItem(new Item(1, "Eletrônico", "Notebook", 3000), 1);
    order.addItem(new Item(2, "Eletrônico", "TV", 1500), 1);
    order.addItem(new Item(3, "Eletrônico", "Xbox", 2000), 1);
    order.addCoupon(new Coupon("VALE20", 20, new Date('2021-12-31')));
    expect(order.getTotal()).toBe(5200);
  });
  it('should be not able create order with expired coupon', () => {
    const order = new Order(moccksCpf.cpfValid, new Date('2020-12-31'));
    const coupon = new Coupon("VALE20", 20, new Date('2020-12-30'));
    order.addItem(new Item(1, "Eletrônico", "Notebook", 3000), 1);
    order.addItem(new Item(2, "Eletrônico", "TV", 1500), 1);
    order.addItem(new Item(3, "Eletrônico", "Xbox", 2000), 1);
    order.addCoupon(coupon);
    expect(order.getTotal()).toBe(6500);
  });
  it('should be able create order with freight', () => {
    const order = new Order(moccksCpf.cpfValid);
    order.addItem(new Item(1, "Eletrônico", "Notebook", 3000, 100, 30, 10, 3), 1);
    order.addItem(new Item(2, "Eletrônico", "TV", 1500, 100, 50, 50, 20), 1);
    order.addItem(new Item(3, "Eletrônico", "Xbox", 2000, 10, 10, 10, 0.9), 3);
    const freight = order.getFreight();
    expect(freight).toBe(260);
  });
});
