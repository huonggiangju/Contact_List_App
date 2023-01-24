import axios from 'axios'

export class UserService{
    static API_URL = 'http://localhost:9090/v1/user';

    //login user
    static login(user){
        return axios.post(`${this.API_URL}/login`, user)
    }

    //signup
    static signup(user){
        return axios.post(`${this.API_URL}/signup`, user)
    }

}