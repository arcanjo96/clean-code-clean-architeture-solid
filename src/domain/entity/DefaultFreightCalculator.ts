import { FreightCalculator } from "./FreightCalculator";
import { Item } from "./Item";

class DefaultFreightCalculator implements FreightCalculator {
  calculate(item: Item) {
    if (!item.width || !item.height || !item.length || !item.weight) return 0;
    const freight = (1000 * item.getVolume() * (item.getDensity() / 100));
    const minFreight = 10;
    return Math.max(minFreight, freight);
  }
}

export { DefaultFreightCalculator };
