import {IUser} from "../../app/models/user";
import {createAsyncThunk, createSlice, Draft, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {FieldValues} from "react-hook-form";
import agent from "../../app/api/agent";
import {history} from "../../index";
import {toast} from "react-toastify";
import {setBasket} from "../basket/basketSlice";

interface IAccountState {
    user: IUser | null
}

const initialState: IAccountState = {
    user: null
}

export const signinUser = createAsyncThunk<IUser, FieldValues>(
    'account/signin',
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.signin(data)
            const {basket, ...user} = userDto

            if (basket) thunkAPI.dispatch(setBasket(basket))

            localStorage.setItem('user', JSON.stringify(user))
            return user
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const fetchUser = createAsyncThunk<IUser>(
    'account/currentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const userDto = await agent.Account.current()
            const {basket, ...user} = userDto

            if (basket) thunkAPI.dispatch(setBasket(basket))

            localStorage.setItem('user', JSON.stringify(user))
            return user
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e)
        }
    }, {
        condition: () => {
            if (!localStorage.getItem('user')) return false
        }
    }
)

export const accountSlice = createSlice({
    name: 'account', initialState,
    reducers: {
        setUser: (state: Draft<any>, action: PayloadAction<any>) => {
            state.user = action.payload
        },
        signout: (state: Draft<any>) => {
            state.user = null
            localStorage.removeItem('user')
            history.push('/')
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchUser.rejected, state => {
            state.user = null
            localStorage.removeItem('user')
            toast.error('Session expired. Please Login again')
            history.push('/')
        })
        builder.addMatcher(isAnyOf(signinUser.fulfilled, fetchUser.fulfilled), ((state: Draft<any>, action) => {
            state.user = action.payload
        }))
        builder.addMatcher(isAnyOf(signinUser.rejected), (state: Draft<any>, action: any) => {
            state.user = null
            throw action.payload
        })
    })
})

export const {signout, setUser} = accountSlice.actions


