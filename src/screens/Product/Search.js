import React, {useState, useEffect} from 'react'
import {size} from "lodash"
import StatusBar from "../../components/StatusBar"
import Search from '../../components/Search'
import ScreenLoading from "../../components/ScreenLoading"
import ResultNotFound from '../../components/Search/ResultNotFound'
import ProductList from '../../components/Search/ProductList'
import { searchProductApi, searchProductFilterApi } from '../../api/search';
import colors from '../../styles/colors';

export default function SearchScreen(props) {
    const { route } = props;
    const { params } = route;
    const { search, search_filter, min_price, max_price, category_name, brand_name, index_category, index_brand } = params;

    const [products, setProducts] = useState(null);

    useEffect(() => {
        (async () => {
            setProducts(null);

            console.log( index_category, index_brand);

            if(min_price!==undefined || max_price!==undefined || category_name!==undefined || brand_name!==undefined)
            {
                const response = await searchProductFilterApi(search, min_price, max_price, category_name, brand_name);
                console.log(response);
                setProducts(response);
            }
            else {
                const response = await searchProductApi(search);
                setProducts(response);
            }
        })()
    }, [ search, search_filter, min_price, max_price, category_name, brand_name ]);

    return (
        <>
            <StatusBar backgroudColor={colors.bgDark} barStyle={"light-content"}/>
            <Search currentSearch={search} />
            {!products ? (
                <ScreenLoading text="Buscando productos..." />
            ) : size(products) === 0 ? (
                <ResultNotFound search={search} />
            ) : (
                <ProductList search={search} min_price={min_price} max_price={max_price} index_category={index_category} index_brand={index_brand} products={products} />
            )
            }
        </>
    )
}

