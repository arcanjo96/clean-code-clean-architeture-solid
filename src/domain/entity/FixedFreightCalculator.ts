import { FreightCalculator } from "./FreightCalculator";
import { Item } from "./Item";

class FixedFreightCalculator implements FreightCalculator {
  calculate(item: Item) {
    return 10;
  }
}

export { FixedFreightCalculator };
