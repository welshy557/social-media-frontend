import { useState } from "react";
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { useToast } from "../context/toast/ToastContext";
import { useAuth } from "../context/AuthContext";

// Set Axios Defaults
axios.defaults.baseURL = "http://192.168.2.15:9090";

type GetDeleteRequest = <ResponseType>(
  endpoint: string,
  params?: Object,
  headers?: AxiosHeaders
) => Promise<AxiosResponse<ResponseType, any>>;

type PostPutRequest = <DataType, ResponseType>(
  endpoint: string,
  data: DataType,
  params?: Object,
  headers?: AxiosHeaders
) => Promise<AxiosResponse<ResponseType, any>>;

export interface API {
  get: GetDeleteRequest;
  delete: GetDeleteRequest;
  post: PostPutRequest;
  put: PostPutRequest;
  isLoading: boolean;
}

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { setAuthState } = useAuth();

  const postOrPut = async <DataType, ResponseType>(
    method: "post" | "put",
    endpoint: string,
    data: DataType,
    params?: Object,
    headers?: AxiosHeaders
  ) => {
    try {
      const options: AxiosRequestConfig<DataType> = {
        method,
        params,
        data,
        url: endpoint,
        headers: headers
          ? headers
          : {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
      };
      setIsLoading(true);
      const response: AxiosResponse<ResponseType> = await axios(options);
      return response;
    } catch (err) {
      // TODO: Remove check for 400 once API returns 401 status code
      if (
        err instanceof AxiosError &&
        (err.response?.status === 401 || err.response?.status === 400)
      ) {
        // Stored token has expired, user must login again
        axios.defaults.headers.Authorization = null;
        setAuthState({ token: null, authenticated: false, user: null });
        toast.error("Session expired. Please log back in");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrDelete = async <ReponseType,>(
    method: "get" | "delete",
    endpoint: string,
    params?: Object,
    headers?: AxiosHeaders
  ) => {
    const options: AxiosRequestConfig = {
      method,
      params,
      url: endpoint,
      headers: headers
        ? headers
        : {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
    };
    try {
      setIsLoading(true);
      const response: AxiosResponse<ReponseType> = await axios(options);
      return response;
    } catch (err) {
      // TODO: Remove check for 400 once API returns 401 status code
      if (
        err instanceof AxiosError &&
        (err.response?.status === 401 || err.response?.status === 400)
      ) {
        // Stored token has expired, user must login again
        axios.defaults.headers.Authorization = null;
        setAuthState({ token: null, authenticated: false, user: null });
        toast.error("Session expired. Please log back in");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const api: API = {
    get: async <ResponseType,>(
      endpoint: string,
      params?: Object,
      headers?: AxiosHeaders
    ) => await getOrDelete<ResponseType>("get", endpoint, params, headers),

    delete: async <ResponseType,>(
      endpoint: string,
      params?: Object,
      headers?: AxiosHeaders
    ) => await getOrDelete<ResponseType>("delete", endpoint, params, headers),

    post: async <DataType, ResponseType>(
      endpoint: string,
      data: DataType,
      params?: Object,
      headers?: AxiosHeaders
    ) =>
      await postOrPut<DataType, ResponseType>(
        "post",
        endpoint,
        data,
        params,
        headers
      ),

    put: async <DataType, ResponseType>(
      endpoint: string,
      data: DataType,
      params?: Object,
      headers?: AxiosHeaders
    ) =>
      await postOrPut<DataType, ResponseType>(
        "put",
        endpoint,
        data,
        params,
        headers
      ),

    isLoading,
  };

  return api;
};

export default useApi;
