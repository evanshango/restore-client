import {IBasket, IBasketItem} from "../../app/models/basket";
import {createAsyncThunk, createSlice, Draft, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import {getCookie} from "../../app/util/util";

interface IBasketState {
    basket: IBasket | null
    status: string
}

const initialState: IBasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<IBasket, { productId: number, quantity?: number }>(
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            return await agent.Basket.addItem(productId, quantity)
        } catch (e: any) {
            return thunkAPI.rejectWithValue({error: e.data})
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, { productId: number, quantity: number, name?: string }>(
    'basket/removeBasketItemAsync',
    async ({productId, quantity}, thunkAPI) => {
        try {
            await agent.Basket.removeItem(productId, quantity)
        } catch (e: any) {
            return thunkAPI.rejectWithValue({error: e.data})
        }
    }
)

export const fetchBasketAsync = createAsyncThunk<IBasket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get()
        } catch (e: any) {
            return thunkAPI.rejectWithValue({error: e.data})
        }
    }, {
        condition: () => {
            if (!getCookie('buyerId')) return false
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket', initialState,
    reducers: {
        setBasket: (state: Draft<any>, action: PayloadAction<any>) => {
            state.basket = action.payload
        },
        clearBasket: (state: Draft<any>) => {
            state.basket = null
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state: Draft<any>, action) => {
            state.status = `pendingAddItem${action.meta.arg.productId}`
        })
        builder.addCase(removeBasketItemAsync.pending, (state: Draft<any>, action) => {
            state.status = `pendingRemoveItem${action.meta.arg.productId}${action.meta.arg.name}`
        })
        builder.addCase(removeBasketItemAsync.fulfilled, (state: Draft<any>, action) => {
            const {productId, quantity} = action.meta.arg
            const itemIndex = state.basket.items.findIndex((i: IBasketItem) => i.productId === productId)
            if (itemIndex === -1 || itemIndex === undefined) return

            state.basket!.items[itemIndex].quantity -= quantity
            if (state.basket.items[itemIndex].quantity === 0) state.basket.items.splice(itemIndex, 1)
            state.status = 'idle'
        })
        builder.addCase(removeBasketItemAsync.rejected, (state: Draft<any>) => {
            state.status = 'idle'
        })
        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled),
            (state: Draft<any>, action) => {
                state.basket = action.payload
                state.status = 'idle'
            })
        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected),
            (state: Draft<any>) => {
                state.status = 'idle'
            })
    })
})

export const {setBasket, clearBasket} = basketSlice.actions
