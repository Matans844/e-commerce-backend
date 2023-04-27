/**
 * Represents a payment result for an order
 */
export interface PaymentResult {
    id: string;
    status: string;
    updateDate: Date;
    email: string;
}