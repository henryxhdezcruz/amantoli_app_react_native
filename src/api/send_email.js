import { API_URL } from "../utils/constants";

export async function readEmail(formData) {
    try {
        const url = `${API_URL}/api/users/read_email.php?email=${formData.email}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function saveCode(email, code) {
    try {
        const url = `${API_URL}/api/users/save_code_to_reset.php?email=${email}&code=${code}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function readCode(email) {
    try {
        const url = `${API_URL}/api/users/read_code.php?email=${email}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function sendEmail(formData, code, name) {
    try {
        const url = `http://192.168.8.160:3000/send-email`;
        const params = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email:formData.email,
            code: code,
            name: name
        }),
        };
        const response = await fetch(url, params);
        //const result = await response.json();
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function resetPassword(email, password) {
    try {
        const url = `${API_URL}/api/users/reset_password.php?email=${email}&password=${password}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
