import { API_URL } from "../utils/constants";

export async function getProductForCategory(category_name) {
    try {
        const url = `${API_URL}/api/products/read_products_for_category.php?category_name=${category_name}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getColorProduct(product_id) {
    try {
        const url = `${API_URL}/api/products/read_color_product.php?product_id=${product_id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getSizeProduct(product_id) {
    try {
        const url = `${API_URL}/api/products/read_size_product.php?product_id=${product_id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getColorSizeProduct(size_id) {
    try {
        const url = `${API_URL}/api/products/read_color_size_product.php?size_id=${size_id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getImageProduct(id) {
    try {
        const url = `${API_URL}/api/products/read_image_product.php?id=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getProductApi(product_id) {
    try {
        const url = `${API_URL}/api/products/read_single.php?product_id=${product_id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}