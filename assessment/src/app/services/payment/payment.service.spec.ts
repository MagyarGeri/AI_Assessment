import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentService } from './payment.service';
import { environment } from '../../../environments/environment';
import { Payment } from './payment-models/payment.model';
import {PaymentStatus} from "./payment-models/payment-status.enum";

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.paymentServiceUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService]
    });

    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should process a payment and return its details', async () => {
    const paymentPayload: Omit<Payment, 'id'> = {
      orderId: 'order-001',
      amount: 100,
      paymentMethod: 'CreditCard',
      status: PaymentStatus.Success,
      timestamp: new Date().toISOString()
    };

    const mockResponse: Payment = {
      ...paymentPayload,
      id: 'payment-001'
    };

    service.processPayment(paymentPayload).then(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/payments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(paymentPayload);

    req.flush(mockResponse);
  });

  it('should retrieve payment status by id', async () => {
    const mockPayment: Payment = {
      id: 'payment-001',
      orderId: 'order-001',
      amount: 100,
      paymentMethod: 'CreditCard',
      status: PaymentStatus.Success,
      timestamp: new Date().toISOString()
    };

    service.getPaymentStatus('payment-001').then(response => {
      expect(response).toEqual(mockPayment);
    });

    const req = httpMock.expectOne(`${baseUrl}/payments/payment-001`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPayment);
  });
});
