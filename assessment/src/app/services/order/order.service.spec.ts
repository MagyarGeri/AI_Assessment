import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { environment } from '../../../environments/environment';
import { Order } from './order-models/order.model';
import {OrderStatus} from "./order-models/order-status.enum";

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  const baseUrl = environment.orderServiceUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding
    httpMock.verify();
  });

  it('should create an order and return it', async () => {
    const orderPayload: Omit<Order, 'id' | 'status'> = {
      productId: 'prod-123',
      quantity: 2,
      customerName: 'Unit Test User',
      address: '123 Test St',
      timestamp: new Date().toISOString()
    };

    const mockResponse: Order = {
      ...orderPayload,
      id: 'order-001',
      status: OrderStatus.Pending,
    };

    service.createOrder(orderPayload).then(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/orders`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(orderPayload);
    req.flush(mockResponse);
  });

  it('should get order by id', async () => {
    const mockOrder: Order = {
      id: 'order-001',
      productId: 'prod-123',
      quantity: 1,
      customerName: 'Unit Test User',
      address: '123 Test St',
      status: OrderStatus.Confirmed,
      timestamp: new Date().toISOString(),
    };

    service.getOrder('order-001').then(response => {
      expect(response).toEqual(mockOrder);
    });

    const req = httpMock.expectOne(`${baseUrl}/orders/order-001`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrder);
  });

  it('should update order status', async () => {
    const updatedStatus = OrderStatus.Confirmed;
    const mockUpdatedOrder: Order = {
      id: 'order-001',
      productId: 'prod-123',
      quantity: 1,
      customerName: 'Unit Test User',
      address: '123 Test St',
      status: updatedStatus,
      timestamp: new Date().toISOString(),
    };

    service.updateOrderStatus('order-001', updatedStatus).then(response => {
      expect(response.status).toBe(updatedStatus);
    });

    const req = httpMock.expectOne(`${baseUrl}/orders/order-001`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ status: updatedStatus });
    req.flush(mockUpdatedOrder);
  });
});
