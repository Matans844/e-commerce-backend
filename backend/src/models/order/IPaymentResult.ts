/**
 * Represents a payment result for an order.
 * Using under_scores style due to PayPal API
 */
export interface IPaymentResult {
  id: string
  status: string
  update_time: Date
  email_address: string
}
