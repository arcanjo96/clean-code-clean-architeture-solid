import { Item } from "./Item";

interface FreightCalculator {
  calculate(item: Item): number;
}

export { FreightCalculator };
