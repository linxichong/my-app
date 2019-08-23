import AxiosApi from "./api";
import { API_URLS } from "../constants";

export const queryNovels = () => {
  const url = API_URLS.NOVELS;
  return AxiosApi.get(url);
};
