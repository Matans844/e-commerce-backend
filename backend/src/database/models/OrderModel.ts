import { model, Schema } from 'mongoose'
import { type OrderDocument } from '../documents/index.js'

const orderModel = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    productItems: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },
    priceItems: {
      type: Number,
      required: true,
      default: 0.0
    },
    priceTax: {
      type: Number,
      required: true,
      default: 0.0
    },
    priceShipping: {
      type: Number,
      required: true,
      default: 0.0
    },
    priceTotal: {
      type: Number,
      required: true,
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },

    paymentResult: {
      id: {
        type: String
      },
      status: {
        type: String
      },
      update_time: {
        type: Date
      },
      email_address: {
        type: String
      }
    },
    paymentMethod: {
      type: String,
      required: true
    },
    paymentDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

export const Order = model<OrderDocument>('Order', orderModel)
