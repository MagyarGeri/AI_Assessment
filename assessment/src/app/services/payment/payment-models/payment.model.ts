import {PaymentStatus} from "./payment-status.enum";

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  status: PaymentStatus;
  timestamp: string;
}
