import {IBasket} from "./basket";

export interface IUser {
    email: string
    token: string
    basket?: IBasket
    roles?: string[]
}
