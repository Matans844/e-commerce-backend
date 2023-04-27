/**
 * Represents a payment result for an order
 */
export interface PaymentResult {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
}