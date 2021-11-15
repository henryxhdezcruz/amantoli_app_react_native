import AsyncStorage from "@react-native-async-storage/async-storage";
import { size, map, filter } from "lodash";
import { CART, API_URL } from "../utils/constants";

export async function read_shopping_cart(auth) {
  try {
    const url = `${API_URL}/api/shopping_cart/read_shopping_cart.php?user_id=${auth.idUser}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function read_product_shopping_cart(auth, id_product) {
  try {
    const url = `${API_URL}/api/shopping_cart/read_product_shopping_cart.php?user_id=${auth.idUser}&product_id=${id_product}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function add_product_shopping_cart(auth, product_id, size, size_color, color, quantity) {
  try {
    const url = `${API_URL}/api/shopping_cart/add_product_shopping_cart.php?user_id=${auth.idUser}&product_id=${product_id}&size=${size}&size_color=${size_color}&color=${color}&quantity=${quantity}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/*export async function addProductCartApi(idProduct, quantity) {
  try {
    const cart = await getProductCartApi();

    if (size(cart) === 0) {
      cart.push({
        idProduct,
        quantity,
      });
    } else {
      let found = false;

      map(cart, (product) => {
        if (product.idProduct === idProduct) {
          product.quantity += quantity;
          found = true;
          return product;
        }
      });

      if (!found) {
        cart.push({
          idProduct,
          quantity,
        });
      }
    }

    await AsyncStorage.setItem(CART, JSON.stringify(cart));
    return true;
  } catch (e) {
    return false;
  }
}*/

export async function delete_product_shopping_cart(auth, product_id) {
  try {
    const url = `${API_URL}/api/shopping_cart/delete_product_shopping_cart.php?user_id=${auth.idUser}&product_id=${product_id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function decreaseProductCartApi(idProduct) {
  let isDelete = false;

  try {
    const cart = await getProductCartApi();
    map(cart, (product) => {
      if (product.idProduct === idProduct) {
        if (product.quantity === 1) {
          isDelete = true;
          return null;
        } else {
          return (product.quantity -= 1);
        }
      }
    });

    if (isDelete) {
      await deleteProductCartApi(idProduct);
    } else {
      await AsyncStorage.setItem(CART, JSON.stringify(cart));
    }

    return true;
  } catch (e) {
    return null;
  }
}

export async function increaseProductCartApi(idProduct) {
  try {
    const cart = await getProductCartApi();
    map(cart, (product) => {
      if (product.idProduct === idProduct) {
        return (product.quantity += 1);
      }
    });

    await AsyncStorage.setItem(CART, JSON.stringify(cart));
    return true;
  } catch (e) {
    return null;
  }
}

export async function paymentCartApi(auth, products, address, totalpayment, token_stripe) {
  try {
    const url = `${API_URL}/api/shopping_cart/pay_shopping_cart.php?user_id=${auth.idUser}&
    contact=${address.name}&
    phone=${address.phone}&
    shipping_cost=${totalpayment}&
    total=${totalpayment}&
    content=${products}&
    envio=${address}&
    token_stripe=${token_stripe}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function cc(auth, tokenStripe, products, address) {
  try {
    const addressShipping = address;
    delete addressShipping.user;
    delete addressShipping.createdAt;

    const url = `${API_URL}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        tokenStripe,
        products,
        idUser: auth.idUser,
        addressShipping,
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteCartApi() {
  try {
    await AsyncStorage.removeItem(CART);
    return true;
  } catch (e) {
    return null;
  }
}
