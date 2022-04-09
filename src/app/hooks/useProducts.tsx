import {useAppDispatch, useAppSelector} from "../store/configureStore";
import {fetchFiltersAsync, fetchProductsAsync, productSelectors} from "../../features/catalog/catalogSlice";
import {useEffect} from "react";

const useProducts = () => {
    const products = useAppSelector(productSelectors.selectAll)
    const {productsLoaded, filtersLoaded, brands, types, meta} = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync())
    }, [dispatch, filtersLoaded])

    return {
        products, productsLoaded, filtersLoaded, brands, types, meta
    }
}
export default useProducts;
