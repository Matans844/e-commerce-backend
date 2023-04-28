/**
 * Represents order price components
 */
export interface OrderCompositePrice {
  priceItems: number
  priceTax: number
  priceShipping: number
  priceTotal: number
}

// TODO: Is this interface an overkill? Maybe I'm over-granulating.
