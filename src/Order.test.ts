import { Cpf } from "./Cpf";
import { OrderNotification } from "./interfaces/OrderNotification";
import { Item } from "./Item";
import { Order } from "./Order";
import * as crypto from 'crypto';
import { Coupon } from "./interfaces/Coupon";

jest.mock('crypto', () => {
    return {
        randomUUID: jest.fn().mockReturnThis(),
    };
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Order Tests', () => {
    const moccksCpf = {
        cpfInvalid: '12345678901',
        cpfValid: '206.161.530-90',
    };
    it('should be able return error if cpf is invalid', () => {
        const cpf = new Cpf(moccksCpf.cpfInvalid);
        const order = new Order(cpf);
        const expected: OrderNotification[] = [
            {
                type: 'ERROR',
                message: 'Invalid CPF'
            }
        ];
        order.checkOrder();
        expect(order.orderNotifications).toEqual(expected);
    });
    it('should be able return true when save order with three items', () => {
        const cpf = new Cpf(moccksCpf.cpfValid);
        const order = new Order(cpf);
        const itemsToAdd = [
            new Item('Smart TV', 3000, 1),
            new Item('Notebook', 2099, 1),
            new Item('Xbox Series S', 1999, 1),
        ];
        order.addItems(itemsToAdd);
        expect(crypto.randomUUID).toHaveBeenCalledTimes(3);
        expect(order.items).toHaveLength(3);
    });
    it('should be able return order with discount percentage', () => {
        const expected = {
            discount: 709.8,
            freightCost: 0,
            totalWithDiscount: 6388.2,
            totalWithoutDiscount: 7098
        };
        const cpf = new Cpf(moccksCpf.cpfValid);
        const order = new Order(cpf);
        const coupon: Coupon = {
            code: '12345',
            mode: 'PERCENTAGE',
            value: 10,
        };
        const itemsToAdd = [
            new Item('Smart TV', 3000, 1),
            new Item('Notebook', 2099, 1),
            new Item('Xbox Series S', 1999, 1),
        ];
        order.addItems(itemsToAdd);
        order.addDiscount(coupon);
        expect(crypto.randomUUID).toHaveBeenCalledTimes(3);
        expect(order.getTotalizers()).toEqual(expected);
    });
});