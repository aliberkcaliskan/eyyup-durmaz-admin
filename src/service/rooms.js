import { tryCatch } from "@thalesrc/js-utils";
import { ROOMS_URL } from "../utils/url";
import http from "./http";


export async function getRooms(clinicId) {
    const url = ROOMS_URL + '/' + clinicId;

    const [error, result] = await tryCatch(http.get(url));

    if (error) throw error;

    return result.data.data;
}


export async function getRoomsDetail(id) {
    const url = `${ROOMS_URL}/${id}`;

    const [error, result] = await tryCatch(http.get(url));

    if (error) throw error;

    return result.data.data;
}



export async function addRooms(payload) {
    const url = ROOMS_URL;

    const [error, result] = await tryCatch(http.post(url, payload));

    if (error) throw error;

    return result.data;
}

export async function updateRooms(payload) {
    const url = ROOMS_URL + '/' + payload.id;

    const [error, result] = await tryCatch(http.put(url, payload));

    if (error) throw error;

    return result.data;
}

export async function deleteRooms(payload) {
    const url = ROOMS_URL + '/' + payload;

    const [error, result] = await tryCatch(http.delete(url, payload));

    if (error) throw error;

    return result.data;
}