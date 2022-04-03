import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

export interface ICounterState {
    data: number
    title: string
}

const initialState: ICounterState = {
    data: 42,
    title: 'YARC (Yet Another Redux Counter with Redux Toolkit)'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state: Draft<any>, action: PayloadAction<any>) => {
            state.data += action.payload
        },
        decrement: (state: Draft<any>, action: PayloadAction<any>) => {
            state.data -= action.payload
        }
    }
})

export const {increment, decrement} = counterSlice.actions
