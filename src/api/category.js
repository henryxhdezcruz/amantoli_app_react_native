import { API_URL } from "../utils/constants";

export async function getCategoryApi(category_name) {
    try {
        const url = `${API_URL}/api/categories/read_only_category.php?category_name=${category_name}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getCategoryImage(category_name) {
    try {
        const url = `${API_URL}/api/categories/category_image.php?category_name=${category_name}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getCategoriesApi() {
    try {
        const url = `${API_URL}/api/categories/read.php`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
