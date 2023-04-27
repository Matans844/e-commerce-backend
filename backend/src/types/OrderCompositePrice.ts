/**
 * Represents order price components
 */
export interface OrderCompositePrice {
    priceItems: number;
    priceTax: number;
    priceShipping: number;
    priceTotal: number;
}