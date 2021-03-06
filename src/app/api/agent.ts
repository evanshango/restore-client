import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {history} from "../../";
import {PaginatedResponse} from "../models/pagination";
import {store} from "../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))
axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.withCredentials = true

const responseBody = (res: AxiosResponse) => res.data

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const account = store.getState().account.user
    if (account) {
        const token = account.token
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`
        }
    }
    return config
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep()
    const pagination = response.headers['pagination']
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination))
        return response
    }
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response!
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = []
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat()
            }
            toast.error(data.title)
            break
        case 401:
            toast.warn(data.title)
            break
        case 403:
            toast.error("You are not authorized to perform this action")
            break
        case 500:
            history.push('/server-error', data)
            break
        default:
            break
    }
    return Promise.reject(error.response)
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: Object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: Object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    createProduct: (url: string, data: FormData) => axios.post(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    updateProduct: (url: string, data: FormData) => axios.put(url, data, {
        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)
}

const createFormData = (item: any) => {
    let formData = new FormData()
    for (const key in item){
        formData.append(key, item[key])
    }
    return formData
}

const Admin = {
    createProduct: (product: any) => requests.createProduct('products', createFormData(product)),
    updateProduct: (product: any) => requests.updateProduct('products', createFormData(product)),
    deleteProduct: (id: number) => requests.delete(`products/${id}`)
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get("products", params),
    details: (id: number) => requests.get(`products/${id}`),
    filters: () => requests.get('products/filters')
}

const TestErrors = {
    get400Error: () => requests.get("buggy/bad-request"),
    get401Error: () => requests.get("buggy/unauthorized"),
    get404Error: () => requests.get("buggy/not-found"),
    get500Error: () => requests.get("buggy/server-error"),
    getValidationError: () => requests.get("buggy/validation-error"),
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (id: number, qty = 1) => requests.post(`basket?productId=${id}&quantity=${qty}`, {}),
    removeItem: (id: number, qty = 1) => requests.delete(`basket?productId=${id}&quantity=${qty}`)
}

const Account = {
    signin: (values: any) => requests.post("account/signin", values),
    signup: (values: any) => requests.post("account/signup", values),
    current: () => requests.get("account/current/user"),
    getAddress: () => requests.get('account/current/address')
}

const Orders = {
    list: () => requests.get('orders'),
    getOrder: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}

const Payments = {
    createPaymentIntent: () => requests.post('payments', {})
}

const agent = {
    Account, Admin, Basket, Catalog, Orders, Payments, TestErrors
}

export default agent
