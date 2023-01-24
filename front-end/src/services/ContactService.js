import axios from 'axios'

export class ContactService{
    static API_URL = 'http://localhost:9090/v1/contact';

    //get all
    static getAllContact() {
        let url = `${this.API_URL}/`;
        return axios.get(url);
    }

    //get by ID
    static getAContact(id){
        return axios.get(`${this.API_URL}/${id}`)
    }

    //add new contact
    static addContact(contact){
        //! Will need to add { "Content-Type": "application/json" } to "headers"
        return axios.post(`${this.API_URL}/`, contact)
    }

    //update a contact
    static updateContact(id, contact){
        //! Will need to add { "Content-Type": "application/json" } to "headers"
        return axios.patch(`${this.API_URL}/${id}`, contact)
    }

    //delete a contact
    static deleteContact(id){
        return axios.delete(`${this.API_URL}/${id}`)
    }
}
