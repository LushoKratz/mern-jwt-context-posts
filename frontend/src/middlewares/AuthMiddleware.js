import axios from "axios"

export const loginMiddleware = async (data) => {

    const signIn = await axios.post('http://localhost:4000/users/signIn', data)
    .then(function (response) {
        window.localStorage.setItem('x-access-token', JSON.stringify(response.data));
        return response.data;
    })
    .catch(function (error) {
        console.log(error.response.data.message);
    });

}

export const register = async (data) => {

}

export const logoutMiddleware = () => {
    window.localStorage.removeItem('x-access-token');
}

export const verifyAuthMiddleware = () => {
    const getToken = window.localStorage.getItem('x-access-token');
}