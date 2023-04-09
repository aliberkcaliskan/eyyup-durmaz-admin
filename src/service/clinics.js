import { tryCatch } from "@thalesrc/js-utils";
import { CLINICS_URL } from "../utils/url";
import http from "./http";


export async function getClinics() {
    const url = CLINICS_URL;

    const [error, result] = await tryCatch(http.get(url));

    if (error) throw error;

    return result.data.data;
}


export async function getClinicsDetail(id) {
    const url = `${CLINICS_URL}/${id}`;

    const [error, result] = await tryCatch(http.get(url));

    if (error) throw error;

    return result.data.data;
}



export async function addClinics(payload) {
    const url = CLINICS_URL;

    const [error, result] = await tryCatch(http.post(url, payload));

    if (error) throw error;

    return result.data;
}

export async function updateClinics(payload) {
    const url = CLINICS_URL + '/' + payload.id;

    const [error, result] = await tryCatch(http.put(url, payload));

    if (error) throw error;

    return result.data;
}

export async function deleteClinics(payload) {
    const url = CLINICS_URL + '/' + payload;

    const [error, result] = await tryCatch(http.delete(url, payload));

    if (error) throw error;

    return result.data;
}