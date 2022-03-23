import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {IBasket} from "../models/basket";

interface IStoreContextValue {
    basket: IBasket | null
    setBasket: (basket: IBasket) => void
    removeItem: (id: number, qty: number) => void
}

export const StoreContext = createContext<IStoreContextValue | undefined>(undefined)

export const useStoreContext = () => {
    const context = useContext(StoreContext)

    if (context == undefined) throw Error("Oops we don't seem to be inside a provider")

    return context
}

export const StoreProvider = ({children}: PropsWithChildren<any>) => {
    const [basket, setBasket] = useState<IBasket | null>(null)

    const removeItem = (id: number, qty: number) => {
        if (!basket) return
        const items = [...basket.items]
        const itemIndex = items.findIndex(i => i.productId === id)

        if (itemIndex >= 0) {
            items[itemIndex].quantity -= qty
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1)
            setBasket(prevState => {
                return {...prevState!, items}
            })
        }
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}
