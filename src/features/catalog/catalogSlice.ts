import {createAsyncThunk, createEntityAdapter, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {IParams, IProduct} from "../../app/models/product";
import agent from "../../app/api/agent";
import {RootState} from "../../app/store/configureStore";
import {IMetadata} from "../../app/models/pagination";

interface ICatalogState {
    productsLoaded: boolean
    filtersLoaded: boolean
    status: string
    brands: string[]
    types: string[]
    productParams: IParams
    meta: IMetadata | null
}

const productsAdapter = createEntityAdapter<IProduct>()

const getAxiosParams = (productParams: IParams) => {
    const params = new URLSearchParams()
    params.append('page', productParams.page.toString())
    params.append('pageSize', productParams.pageSize.toString())
    params.append('orderBy', productParams.orderBy)

    if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm)
    if (productParams.brands.length > 0) params.append('brands', productParams.brands.toString())
    if (productParams.types.length > 0) params.append('types', productParams.types.toString())

    return params
}

export const fetchProductsAsync = createAsyncThunk<IProduct[], void, { state: RootState }>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams)
        try {
            const response = await agent.Catalog.list(params)
            thunkAPI.dispatch(setMetaData(response.metaData))
            return response.items
        } catch (e: any) {
            return thunkAPI.rejectWithValue({error: e.data})
        }
    }
)

export const fetchProductAsync = createAsyncThunk<IProduct, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId)
        } catch (e: any) {
            return thunkAPI.rejectWithValue({error: e.data})
        }
    }
)

export const fetchFiltersAsync = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.filters()
        } catch (e: any) {
            return thunkAPI.rejectWithValue({error: e.data})
        }
    }
)

const initParams = () => {
    return {
        page: 1,
        pageSize: 12,
        orderBy: 'name',
        types: [],
        brands: []
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<ICatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParams: initParams(),
        meta: null
    }),
    reducers: {
        setParams: (state: Draft<any>, action: PayloadAction<any>) => {
            state.productsLoaded = false
            state.productParams = {...state.productParams, ...action.payload, page: 1}
        },
        setPageNumber: (state: Draft<any>, action) => {
            state.productsLoaded = false
            state.productParams = {...state.productParams, ...action.payload}
        },
        resetParams: (state: Draft<any>) => {
            state.productParams = initParams()
        },
        setMetaData: (state: Draft<any>, action) => {
            state.metaData = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state: Draft<any>) => {
            state.status = 'pendingFetchProducts'
        })
        builder.addCase(fetchProductsAsync.fulfilled, (state: Draft<any>, action) => {
            productsAdapter.setAll(state, action.payload)
            state.status = 'idle'
            state.productsLoaded = true
        })
        builder.addCase(fetchProductsAsync.rejected, (state: Draft<any>) => {
            state.status = 'idle'
        })
        builder.addCase(fetchProductAsync.pending, (state: Draft<any>) => {
            state.status = 'pendingFetchProduct'
        })
        builder.addCase(fetchProductAsync.fulfilled, (state: Draft<any>, action) => {
            productsAdapter.upsertOne(state, action.payload)
            state.status = 'idle'
        })
        builder.addCase(fetchProductAsync.rejected, (state: Draft<any>) => {
            state.status = 'idle'
        })
        builder.addCase(fetchFiltersAsync.pending, (state: Draft<any>) => {
            state.status = 'pendingFetchFilters'
        })
        builder.addCase(fetchFiltersAsync.fulfilled, (state: Draft<any>, action) => {
            state.brands = action.payload.brands
            state.types = action.payload.types
            state.filtersLoaded = true
            state.status = 'idle'
        })
        builder.addCase(fetchFiltersAsync.rejected, (state: Draft<any>) => {
            state.status = 'idle'
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)
export const {setParams, resetParams, setMetaData, setPageNumber} = catalogSlice.actions
