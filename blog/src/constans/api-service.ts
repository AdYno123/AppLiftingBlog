import axios from "axios";
import { ServiceResponse } from "./stored-interface";

let URL_BACKEND = "https://fullstack.exercise.applifting.cz/";

/**
 * Send GET request to API server
 * @param requestURL
 * @returns
 */
export const GET_HTTP_REQUEST = async <T>(requestURL: string) => {
  let returnSuccess: ServiceResponse<T> = {
    message: "Initial state",
    success: false,
    data: null,
  };
  try {
    await axios
      .get<T>(URL_BACKEND + requestURL, {
        headers: {
          "Content-type": "application/json; charset=utf-8",
          "X-API-KEY": `b7526ea2-4ec8-4612-88d9-77e6613248bb`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        returnSuccess = {
          message: `Success`,
          success: true,
          data: response.data,
        };
      });
    return returnSuccess;
  } catch (error) {
    let e = error as Error;
    let returnFailed: ServiceResponse<T> = {
      message: `Error send POST request - ${e.message}`,
      success: false,
      data: null,
    };
    return returnFailed;
  }
};

/**
 * Send DELETE request to API server
 * @param requestURL
 * @returns
 */
export const GET_HTTP_REQUEST_DELETE = async <T>(requestURL: string) => {
  let returnSuccess: ServiceResponse<T> = {
    message: "Initial state",
    success: false,
    data: null,
  };
  try {
    await axios
      .delete<T>(URL_BACKEND + requestURL, {
        headers: {
          "Content-type": "application/json; charset=utf-8",
          "X-API-KEY": `b7526ea2-4ec8-4612-88d9-77e6613248bb`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        returnSuccess = {
          message: `Success`,
          success: true,
          data: response.data,
        };
      });
    return returnSuccess;
  } catch (error) {
    let e = error as Error;
    let returnFailed: ServiceResponse<T> = {
      message: `Error send POST request - ${e.message}`,
      success: false,
      data: null,
    };
    return returnFailed;
  }
};
/**
 * Send POST request to API server
 * @param requestURL url addres with controller/method and params
 * @param data
 * @returns
 */
export const POST_HTTP_REQUEST = async <T>(requestURL: string, data: any) => {
  let returnSuccess: ServiceResponse<T> = {
    message: "Initial state",
    success: false,
    data: null,
  };
  try {
    await axios
      .post<T>(URL_BACKEND + requestURL, data, {
        headers: {
          "Content-type": "application/json; charset=utf-8",
          "X-API-KEY": `b7526ea2-4ec8-4612-88d9-77e6613248bb`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        returnSuccess = {
          message: `Success`,
          success: true,
          data: response.data,
        };
      });
    return returnSuccess;
  } catch (error) {
    let e = error as Error;
    let returnFailed: ServiceResponse<T> = {
      message: `Error send POST request - ${e.message}`,
      success: false,
      data: null,
    };
    return returnFailed;
  }
};

/**
 * Send PATCH request to API server
 * @param requestURL
 * @param data
 * @returns
 */
export const POST_HTTP_REQUEST_PATCH = async <T>(
  requestURL: string,
  data: any
) => {
  let returnSuccess: ServiceResponse<T> = {
    message: "Initial state",
    success: false,
    data: null,
  };
  try {
    await axios
      .patch<T>(URL_BACKEND + requestURL, data, {
        headers: {
          "Content-type": "application/json; charset=utf-8",
          "X-API-KEY": `b7526ea2-4ec8-4612-88d9-77e6613248bb`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        returnSuccess = {
          message: `Success`,
          success: true,
          data: response.data,
        };
      });
    return returnSuccess;
  } catch (error) {
    let e = error as Error;
    let returnFailed: ServiceResponse<T> = {
      message: `Error send POST request - ${e.message}`,
      success: false,
      data: null,
    };
    return returnFailed;
  }
};
