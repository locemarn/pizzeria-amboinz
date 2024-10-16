export class Ingredients {
  constructor(
    public readonly ingredient: string,
    public readonly id?: number
  ) {}
}

export class pizza {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly ingredients: Ingredients[],
    public readonly id?: number
  ) {}
}

export class order {
  constructor(
    public readonly order: pizza[],
    public readonly id?: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
