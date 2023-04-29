import { model, Schema } from 'mongoose'
import { type OrderDocument } from '../../types/order/Order.js'

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
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
    paymentMethod: {
      type: String,
      required: true
    },
    paymentResult: {
      id: {
        type: String
      },
      status: {
        type: String
      },
      updateDate: {
        type: Date
      },
      email: {
        type: String
      }
    },
    orderCompositePrice: {
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
      }
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
    paymentDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

export const OrderModelMongooseDocument = model<OrderDocument>('Order', orderSchema)
