import { Coupon } from "./Coupon";
import { Cpf } from "./Cpf";
import { FreightCalculator } from "./FreightCalculator";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";

class Order {
  cpf: Cpf;
  private orderItems: OrderItem[];
  coupon: Coupon | undefined;
  private freight: number;

  constructor(cpf: string, readonly date: Date = new Date()) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freight = 0;
  }

  public addItem(item: Item, quantity: number): void {
    this.freight += FreightCalculator.calculate(item) * quantity;
    this.orderItems.push(new OrderItem(item.id, item.price, quantity));
  }

  public addCoupon(coupon: Coupon): void {
    if (coupon.isExpired(this.date)) return;
    this.coupon = coupon;
  }

  public getFreight(): number {
    return this.freight;
  }

  public getTotal(): number {
    let total = this.orderItems.reduce((total, orderItem) => {
      return total + orderItem.getTotal();
    }, 0);
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date);
    }
    return total;
  }
}

export { Order }
