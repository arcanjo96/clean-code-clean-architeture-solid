import PlaceOrder from "../../src/application/useCases/PlaceOrder";
import PlaceOrderInput from "../../src/application/useCases/PlaceOrderInput";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepostioryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepostioryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

describe('', () => {
  it('Place Order', async () => {
    const itemRepository = new ItemRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const input: PlaceOrderInput = {
      cpf: '996.882.030-09',
      orderItems: [
        {
          idItem: 1,
          quantity: 1
        },
        {
          idItem: 2,
          quantity: 2
        }
      ],
      date: new Date("2022-01-01"),
      coupon: 'TUDO10'
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5400);
  });

  it('Place Order with freight', async () => {
    const itemRepository = new ItemRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
    const input: PlaceOrderInput = {
      cpf: '996.882.030-09',
      orderItems: [
        {
          idItem: 4,
          quantity: 1
        },
        {
          idItem: 5,
          quantity: 1
        },
        {
          idItem: 6,
          quantity: 3
        }
      ],
      date: new Date("2022-01-01"),
      coupon: 'TUDO10'
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(11060);
  });
});