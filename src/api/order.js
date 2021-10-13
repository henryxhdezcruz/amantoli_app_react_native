import { API_URL } from "../utils/constants";

export async function getOrdersApi(auth) {
  try {
    const url = `${API_URL}/api/orders/read.php?user_id=1`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
