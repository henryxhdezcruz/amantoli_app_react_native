import { size } from "lodash";
import { API_URL } from "../utils/constants";

export async function addFavoriteApi(auth, idProduct) {
  try {
    const url = `${API_URL}/api/favorite/addFavorite.php?product_id=${idProduct}&user_id=${auth.idUser}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isFavoriteApi(auth, idProduct) {
  try {
    const url = `${API_URL}/api/favorite/isFavorite.php?user_id=${auth.idUser}&product_id=${idProduct}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteFavoriteApi(auth, idProduct) {
  try {
    const url = `${API_URL}/api/favorite/deleteFavorite.php?product_id=${idProduct}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoriteApi(auth) {
  try {
    const url = `${API_URL}/api/favorite/getFavorite.php?user_id=${auth.idUser}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

