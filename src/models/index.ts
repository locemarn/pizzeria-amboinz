export class Ingredients {
  constructor(
    public readonly ingredient: string,
    public readonly id?: number
  ) {}
}

export class Pizzas {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly ingredients: Ingredients[],
    public readonly id?: number
  ) {}
}

export class Orders {
  constructor(
    public readonly order: Pizzas[],
    public readonly id?: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
