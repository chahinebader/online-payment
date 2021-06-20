import axios from "axios";

export const clientHttp = axios.create({
  baseURL: "https://cloud-storage-prices-moberries.herokuapp.com",
  timeout: 60000,
});
export const getPrices: any = async () => {
  return await clientHttp.get(`/prices`);
};
export const submitPayment: any = async () => {
  return await clientHttp.post(`https://httpbin.org/post`);
};
