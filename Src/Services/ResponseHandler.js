import { getToken } from "./asyncStorage";
import { merchant_url } from "../Config/AppConfig";

export const GET = async (dispatch, url, data) => {
  const token = await getToken();
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
    // body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json().then((responseJson) => {
        console.log("geturl-->", url, responseJson);

        return responseJson;
      });
    })
    .catch((err) => {
      console.log("GET--", url, err);
    });
};
export async function POST(dispatch, url, data) {
  const token = await getToken();
  let formData = new FormData();
  if (data) {
    Object.keys(data).map((element) => {
      formData.append(element, data[element]);
    });
  }
  if (token) {
    formData.append("auth_token", token);
  }
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
    body: formData,
  })
    .then((response) => {
      return response.json().then((responseJson) => {
        console.log("posturl-->", url, formData, responseJson);
        return responseJson;
      });
    })
    .catch((err) => {
      console.log("post--", url, formData, err);
    });
}

export async function PUT(dispatch, url, data) {
  const token = await getToken();

  console.log("--------------", url, data);
  return fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json().then((responseJson) => {
        console.log("PUT-->", url, data, responseJson);
        return responseJson;
      });
    })
    .catch((err) => {
      console.log("PUT--", url, data, err);
    });
}
export async function DELETE(url, data) {
  const token = await getToken();

  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    // body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json().then((responseJson) => {
        return responseJson;
      });
    })
    .catch((err) => {
      console.log("post", err);
    });
}
