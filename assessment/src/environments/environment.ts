export const environment = {
  production: false,

  // URLs for the microservices used in testing automation
  orderServiceUrl: (window as any)?.__env?.ORDER_SERVICE_URL || 'http://localhost:3001/api',
  paymentServiceUrl: (window as any)?.__env?.PAYMENT_SERVICE_URL || 'http://localhost:3002/api',
};
