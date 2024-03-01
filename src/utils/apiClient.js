import { fetchApi } from "./http";

class ClientApiService {
  get(url) {
    const headers = {
      "Content-type": "application/json",
    };
    return fetchApi(url, { headers: headers });
  }
}

export default new ClientApiService();