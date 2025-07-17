export class OrderFactory {
  static createOrder(productId: string = 'default-prod-001', quantity: number = 1) {
    return {
      productId,
      quantity,
      customerName: "Test User",
      address: "123 Test Lane",
      timestamp: new Date().toISOString()
    };
  }
}
