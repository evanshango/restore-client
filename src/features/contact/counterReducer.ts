export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

export interface ICounterState {
    data: number
    title: string
}

const initialState: ICounterState = {
    data: 42,
    title: 'YARC (Yet Another Redux Counter)'
}

export const increment = (amount = 1) => {
    return {
        type: INCREMENT_COUNTER,
        payload: amount
    }
}

export const decrement = (amount = 1) => {
    return {
        type: DECREMENT_COUNTER,
        payload: amount
    }
}

const counterReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state, data: state.data + action.payload
            }
        case DECREMENT_COUNTER:
            return {
                ...state, data: state.data - action.payload
            }
        default:
            return state
    }
}

export default counterReducer
