export class PaymentFactory {
  static createPayment(orderId: string, amount: number, status: 'Success' | 'Failed' = 'Success') {
    return {
      orderId,
      amount,
      paymentMethod: 'CreditCard',
      status,
      timestamp: new Date().toISOString()
    };
  }
}
