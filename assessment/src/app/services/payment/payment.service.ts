import { Injectable } from '@angular/core';
import { HttpClientWrapper } from '../../utils/http-client';
import { environment } from '../../../environments/environment';
import {Payment} from "./payment-models/payment.model";

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = environment.paymentServiceUrl;

  constructor(private httpClient: HttpClientWrapper) {}

  processPayment(paymentPayload: Omit<Payment, 'id'>): Promise<Payment> {
    return this.httpClient.post<Payment>(`${this.baseUrl}/payments`, paymentPayload);
  }

  getPaymentStatus(paymentId: string): Promise<Payment> {
    return this.httpClient.get<Payment>(`${this.baseUrl}/payments/${paymentId}`);
  }
}
