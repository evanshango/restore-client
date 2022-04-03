export interface IBasketItem {
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    brand: string;
    type: string;
    quantity: number;
}

export interface IBasket {
    id: number;
    buyerId: string;
    items: IBasketItem[];
    paymentIntentId?: string;
    clientSecret?: string;
}
