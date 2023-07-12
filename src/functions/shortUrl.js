import axios from "axios";

const API = process.env.REACT_APP_API + "/api";


export const getUrl = async (params, token) =>
  await axios.get(API + "/url/" + params, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const shortUrl = async (data, token) =>
  await axios.post(API + "/url/", data, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const remove = async (id, token) =>
  await axios.delete(API + "/url/" + id, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
