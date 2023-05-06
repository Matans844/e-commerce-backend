// Define a type for the ProductUpdated event
export interface ProductUpdatedEvent {
  productId: string
}

// Define a type for the ProductDeleted event
export interface ProductDeletedEvent {
  productId: string
}

// Define a type for the UserDeleted event
export interface UserDeletedEvent {
  userId: string
}

// Define a type for the CartEmptied event
export interface CartEmptiedEvent {
  cartId: string
}

// Define a type for the CartUpdated event
export interface CartUpdatedEvent {
  cartId: string
}
