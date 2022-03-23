export interface IProduct {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    type?: string
    brand: string
    qtyInStock?: number
}

export interface IParams {
    orderBy: string
    searchTerm?: string
    types: string[]
    brands: string[]
    page: number
    pageSize: number
}
