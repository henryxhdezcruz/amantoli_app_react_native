import { API_URL } from "../utils/constants";

export async function getAddressesApi(auth) {
    try {
        const url = `${API_URL}/api/directions/read_user_directions.php?user_id=${auth.idUser}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
      } catch (error) {
        console.log(error);
        return [];
      }
}

export async function addAddressApi(auth, formData) {
    try {
      const url = `${API_URL}/api/directions/add_user_direction.php?user_id=${auth.idUser}&
      title=${formData.title}&
      name=${formData.name_lastname}&
      postal_code=${formData.postal_code}&
      country=${formData.country}&
      state=${formData.state}&
      city=${formData.city}&
      references=${formData.address}&
      phone=${formData.phone}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
}

export async function deleteAddressApi(auth, idAddress) {
    try {
        const url = `${API_URL}/addresses/${idAddress}`;
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
        };
        const response = await fetch(url ,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getAddressApi(auth, idAddress) {
    try {
        const url=`${API_URL}/addresses/${idAddress}`;
        const params = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            }
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;       
    }
}

export async function updateAddressApi(auth, address) {
    try {
        const url = `${API_URL}/addresses/${address._id}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify( address ),
        };
        const response = await fetch(url ,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}