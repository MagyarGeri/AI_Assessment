import 'zone.js';
import { HttpClient } from '@angular/common/http';
import { HttpClientWrapper } from '../../utils/http-client';
import {environment} from "../../../environments/environment";

describe('Payment Service Integration Tests', () => {
  const httpClientWrapper = new HttpClientWrapper(new HttpClient(null as any));
  const paymentBaseUrl = environment.paymentServiceUrl;
  const orderBaseUrl = environment.orderServiceUrl;

  // Helper: create a new order for testing
  async function createTestOrder() {
    const orderPayload = {
      productId: 'test-product-001',
      quantity: 1,
      customerName: 'Integration Test User',
      address: '123 Integration St',
      timestamp: new Date().toISOString()
    };
    return await httpClientWrapper.post<any>(`${orderBaseUrl}/orders`, orderPayload);
  }

  it('Happy path: Payment success updates order status to Confirmed', async () => {
    const order = await createTestOrder();
    expect(order).toBeDefined();
    expect(order.status).toBe('Pending');

    // Process successful payment
    const paymentPayload = {
      orderId: order.id,
      amount: 100,
      paymentMethod: 'CreditCard',
      status: 'Success',
      timestamp: new Date().toISOString()
    };

    const payment = await httpClientWrapper.post<any>(`${paymentBaseUrl}/payments`, paymentPayload);
    expect(payment).toBeDefined();
    expect(payment.status).toBe('Success');

    // Verify order status updated
    const updatedOrder = await httpClientWrapper.get<any>(`${orderBaseUrl}/orders/${order.id}`);
    expect(updatedOrder.status).toBe('Confirmed');
  });

  it('Error handling: Payment failure updates order status to Payment Failed', async () => {
    const order = await createTestOrder();
    expect(order.status).toBe('Pending');

    // Process payment failure
    const paymentPayload = {
      orderId: order.id,
      amount: 100,
      paymentMethod: 'CreditCard',
      status: 'Failed',
      timestamp: new Date().toISOString()
    };

    const payment = await httpClientWrapper.post<any>(`${paymentBaseUrl}/payments`, paymentPayload);
    expect(payment.status).toBe('Failed');

    // Verify order status reflects payment failure
    const updatedOrder = await httpClientWrapper.get<any>(`${orderBaseUrl}/orders/${order.id}`);
    expect(updatedOrder.status).toBe('Payment Failed');
  });

  it('Data validation: Validate payment API response structure and consistency', async () => {
    const order = await createTestOrder();

    const paymentPayload = {
      orderId: order.id,
      amount: 150,
      paymentMethod: 'CreditCard',
      status: 'Success',
      timestamp: new Date().toISOString()
    };

    const payment = await httpClientWrapper.post<any>(`${paymentBaseUrl}/payments`, paymentPayload);
    expect(payment).toEqual(jasmine.objectContaining({
      id: jasmine.any(String),
      orderId: jasmine.any(String),
      amount: jasmine.any(Number),
      paymentMethod: jasmine.any(String),
      status: jasmine.any(String),
      timestamp: jasmine.any(String)
    }));

    // Additional consistency check: orderId matches
    expect(payment.orderId).toBe(order.id);
  });
});
