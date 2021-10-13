import { API_URL } from "../utils/constants";

export async function registerApi(formData) {
    try {
        const url = `${API_URL}/api/users/create.php?name=${formData.username}&email=${formData.email}&password=${formData.password}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function loginApi(formData) {
    try {
        const url = `${API_URL}/api/users/login.php?email=${formData.identifier}&password=${formData.password}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getMeApi(token) {
    try {
        const url = `${API_URL}/api/users/read_single.php?id=${token}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function update_email(auth, formData) {
    try {
        const url = `${API_URL}/api/users/update_email.php?id=${auth.token}&email=${formData.email}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function update_password(auth, formData) {
    try {
        const url = `${API_URL}/api/users/update_password.php?id=${auth.token}&password=${formData.password}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function update_name(auth, formData) {
    try {
        const url = `${API_URL}/api/users/update_name.php?id=${auth.token}&name=${formData.name}&last_name=${formData.lastname}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}