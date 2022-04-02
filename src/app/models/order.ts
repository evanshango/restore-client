export interface IShippingAddress {
    fullName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface IOrderItem {
    productId: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
}

export interface IOrder {
    id: number;
    buyerId: string;
    shippingAddress: IShippingAddress;
    orderDate: string;
    orderItems: IOrderItem[];
    subtotal: number;
    deliveryFee: number;
    orderStatus: string;
    total: number;
}
