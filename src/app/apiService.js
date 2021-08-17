import axios from "axios";
import { Config } from "./constant";

export const ApiService = axios.create({
  baseURL: Config.baseUrl + Config.prefix + Config.apiVersionPrefix,
  timeout: 10000,
});
