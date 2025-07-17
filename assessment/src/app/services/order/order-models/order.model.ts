import {OrderStatus} from "./order-status.enum";

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  customerName: string;
  address: string;
  status: OrderStatus;
  timestamp: string;
}
