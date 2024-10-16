import { Orders } from '../models'

export interface OrdersInterface {
  create(data: Orders): Promise<Orders>
  delete(id: number): Promise<Orders>
}
