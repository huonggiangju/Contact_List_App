import axiosRequest from "./instance";

export const getAllContacts = async () => {
  return await axiosRequest.get("/");
};

export const getContactById = async (id) => {
  return await axiosRequest.get(`/${id}`);
};

export const addContact = async (contact) => {
  return await axiosRequest.post("/", contact, {
    headers: { "Content-Type": "application/json" }
  });
};

export const updateContact = async (id, contact) => {
  return await axiosRequest.patch(`/${id}`, contact, {
    headers: { "Content-Type": "application/json" }
  });
};

export const deleteContact = async (id) => {
  return await axiosRequest.delete(`/${id}`);
};
