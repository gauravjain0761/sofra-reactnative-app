import { getLanguage, getToken } from "./asyncStorage";
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
  })
    .then((response) => {
      return response.json().then((responseJson) => {
        console.log("GET-->", url, responseJson);
        return responseJson;
      });
    })
    .catch((err) => {
      console.log("GET-->", url, err);
    });
};
export async function POST(dispatch, url, data) {
  const token = await getToken();
  const lan = await getLanguage();
  let formData = new FormData();
  if (data) {
    Object.keys(data).map((element) => {
      if (data[element] !== undefined) {
        formData.append(element, data[element]);
      }
    });
  }
  if (data?.language == undefined) {
    formData.append("language", lan);
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
        console.log("POST-->", url, formData, responseJson);
        return responseJson;
      });
    })
    .catch((err) => {
      console.log("POST-->", url, formData, err);
    });
}
