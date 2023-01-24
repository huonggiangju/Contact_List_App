
import axiosRequest from "./instance";

export class ContactService{

    static getAllContacts = async () => {
        return await axiosRequest.get("/");
      };
      
    static getContactById = async (id) => {
        return await axiosRequest.get(`/${id}`);
    };
    static addContact = async (contact) => {
        return await axiosRequest.post("/", contact, {
          headers: { "Content-Type": "application/json" }
        });
      };
    
    static updateContact = async (id, contact) => {
        return await axiosRequest.patch(`/${id}`, contact, {
            headers: { "Content-Type": "application/json" }
        });
    };
    
    static deleteContact = async (id) => {
        return await axiosRequest.delete(`/${id}`);
    };
}

