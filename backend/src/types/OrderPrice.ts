/**
 * Represents order price components
 */
export interface OrderPrice {
    priceItems: number;
    priceTax: number;
    priceShipping: number;
    priceTotal: number;
}