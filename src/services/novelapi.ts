import { BaseApi } from "./api";
import { API_URLS } from "../constants";


export const queryNovels = () => {
    console.log(process.env.NODE_ENV)
    
    let url = API_URLS.NOVELS;
    return BaseApi.get(url)
}