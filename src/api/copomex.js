import { API_COPOMEX, TOKEN_COPOMEX } from "../utils/constants";

export async function getInfoCP_SimplifiedApi(cp) {
    try {
        const url=`${API_COPOMEX}/query/info_cp/${cp}?type=simplified&token=${TOKEN_COPOMEX}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;       
    }
}