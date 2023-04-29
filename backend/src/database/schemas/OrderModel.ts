import { model, Schema } from 'mongoose'
import { type OrderDocument } from '../documents/index.js'

const orderSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    cartID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Cart'
    },
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
    paymentMethod: {
      type: String,
      required: true
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
    paymentDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

export const OrderMongooseSchemas = model<OrderDocument>('Order', orderSchema)
