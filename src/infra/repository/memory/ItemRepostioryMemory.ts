import { Item } from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[];

  constructor() {
    this.items = [
      new Item(1, "Eletrônico", "Notebook", 3000),
      new Item(2, "Eletrônico", "TV", 1500),
      new Item(3, "Eletrônico", "Xbox", 2000),
      new Item(4, "Eletrônico", "Notebook", 1000, 100, 30, 10, 3),
      new Item(5, "Eletrônico", "TV", 5000, 100, 50, 50, 20),
      new Item(6, "Eletrônico", "Xbox", 2000, 10, 10, 10, 0.9)
    ];
  }

  findById(idItem: number): Promise<Item | undefined> {
    return Promise.resolve(this.items.find(item => item.id === idItem));
  }
}