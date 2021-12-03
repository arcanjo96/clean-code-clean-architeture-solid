import { Coupon } from "./Coupon";
import { Cpf } from "./Cpf";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";

class Order {
  cpf: Cpf;
  orderItems: OrderItem[];
  coupon: Coupon | undefined;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
  }

  public addItem(item: Item, quantity: number): void {
    this.orderItems.push(new OrderItem(item.id, item.price, quantity));
  }

  public addCoupon(coupon: Coupon): void {
    this.coupon = coupon;
  }

  public getTotal(): number {
    let total = this.orderItems.reduce((total, orderItem) => {
      return total + orderItem.getTotal();
    }, 0);
    if (this.coupon) {
      total -= (total * this.coupon.percentage) / 100;
    }
    return total;
  }
}

export { Order }
