import { tryCatch } from "@thalesrc/js-utils";
import { LOGIN_URL } from "../utils/url";
import http from "./http";

export async function loginUser(payload) {
  const url = LOGIN_URL;

  const [error, result] = await tryCatch(http.post(url, payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }));

  if (error) throw error;

  return result.data.data;
}
