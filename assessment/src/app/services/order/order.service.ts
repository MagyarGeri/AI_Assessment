import { Injectable } from '@angular/core';
import { HttpClientWrapper } from '../../utils/http-client';
import { environment } from '../../../environments/environment';
import {Order} from "./order-models/order.model";
import {OrderStatus} from "./order-models/order-status.enum";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = environment.orderServiceUrl;

  constructor(private httpClient: HttpClientWrapper) {}

  createOrder(order: Omit<Order, 'id' | 'status'>): Promise<Order> {
    return this.httpClient.post<Order>(`${this.baseUrl}/orders`, order);
  }

  getOrder(orderId: string): Promise<Order> {
    return this.httpClient.get<Order>(`${this.baseUrl}/orders/${orderId}`);
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    return this.httpClient.put<Order>(`${this.baseUrl}/orders/${orderId}`, { status });
  }
}
