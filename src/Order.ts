import { Cpf } from "./Cpf";
import { Coupon } from "./interfaces/Coupon";
import { OrderNotification } from "./interfaces/OrderNotification";
import { Item } from "./Item";

class Order {
    public orderNotifications: OrderNotification[] = [];
    public items: Item[] = [];
    public discount: number = 0;
    public freightCost: number = 0;

    constructor(private cpf: Cpf) { }

    public addItems(items: Item[]): void {
        this.items = items;
    }

    public addDiscount(coupon: Coupon): void {
        if (coupon.mode === 'PERCENTAGE') {
            this.discount = this.getTotal() * (coupon.value / 100);
            return;
        }
        this.discount = coupon.value;
    }

    private getTotal() {
        return this.items.reduce((total, currentItem) => {
            return total + currentItem.price;
        }, 0);
    }

    public saveOrder(): boolean {
        this.checkOrder();
        if (this.orderNotifications.some(notification => notification.type === 'ERROR')) {
            throw new Error('This order has errors');
        }
        return true;
    }

    public checkOrder(): void {
        if (!this.cpf.validate()) {
            this.orderNotifications.push({
                type: 'ERROR',
                message: 'Invalid CPF'
            });
        }
    }

    public getTotalizers() {
        return {
            totalWithoutDiscount: Number(this.getTotal().toFixed(2)),
            discount: Number(this.discount.toFixed(2)),
            freightCost: Number(this.freightCost.toFixed(2)),
            totalWithDiscount: Number((this.getTotal() - this.discount + this.freightCost).toFixed(2)),
        };
    }
}

export { Order }