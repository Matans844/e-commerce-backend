import { type IProductItem } from './IProductItem.js'
import { type ICart } from './ICart.js'

class Cart implements ICart {
  private cartItems: IProductItem[]

  constructor (private readonly cartID: string, private readonly userID: string) {
    this.cartItems = []
  }

  public addCartItem (item: IProductItem): void {
    this.cartItems.push(item)
  }

  public removeCartItem (cartItemID: string): void {
    const index = this.cartItems.findIndex((item) => item.getCartItemID() === cartItemID)
    if (index !== -1) {
      this.cartItems.splice(index, 1)
    }
  }

  public getCartItems (): IProductItem[] {
    return this.cartItems
  }

  public getCartID (): string {
    return this.cartID
  }

  public getUserID (): string {
    return this.userID
  }

  public clearCart (): void {
    this.cartItems = []
  }
}
