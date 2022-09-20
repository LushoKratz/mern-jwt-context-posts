import axios from 'axios';
import { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//import { loginMiddleware } from '../middlewares/AuthMiddleware';

const initialUserState = [];

export const AuthContext = createContext(initialUserState);

export const useUserAuth = () => {
    const context = useContext(AuthContext);

    if(!context) throw new Error('There is not auth provider');
    return context;
}

export function AuthContextProvider ({children}) {

    //const [user, setuser] = useState(() => window.localStorage.getItem('jwt'));
    const [user, setUser] = useState();
    const [error, setError] = useState('');
    const [authorize, setAuthorize] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (data) => {
        setLoading(true);
        await axios.post(`${process.env.REACT_APP_BACKEND_URI}/users/signIn`, data)
            .then(function (response) {
                window.localStorage.setItem('x-access-token', JSON.stringify(response.data));
                //console.log(response);
                setError('');
                setAuthorize(true);
                navigate('/');
            })
            .catch(function (error) {
                //console.log(error.response.data.message);
                setError(error.response.data.message);
                console.clear();
            });
    setLoading(false);
    }

    const signUp = async (data) => {
        setLoading(true);
        await axios.post(`${process.env.REACT_APP_BACKEND_URI}/users/signUp`, data)
            .then(function (response) {
                //console.log(response);
                window.localStorage.setItem('x-access-token', JSON.stringify(response.data));
                setError('');
                setAuthorize(true);
                navigate('/');
            })
            .catch(function (error) {
                //console.log(error.response.data.message);
                setError(error.response.data.message);
                console.clear();
            });
        setLoading(false);
    }

    const verifyAuth = async () => {
            try {
                const getToken = JSON.parse(localStorage.getItem('x-access-token'));
                //console.log(getToken);
                const verifyToken = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/users/verifyToken`, {headers: {'x-access-token': getToken }});
                    //console.log(verifyToken.data.message)
                    setAuthorize(true);
            } catch (error) {
                //console.log(error.response.data.message);
                if(error.response.data.message === 'token expired'){
                    window.localStorage.removeItem('x-access-token');
                    navigate('/signIn');
                    setAuthorize(false);
                    console.clear();
                }
            }
    }

    const logout = () => {
        window.localStorage.removeItem('x-access-token');
        setAuthorize(false);
        navigate('/signIn');
    }

    
    useEffect(() => {
        setError('');
        setLoading(false);
        verifyAuth();
    }, [])

    return (
        <AuthContext.Provider value={{login,signUp,verifyAuth, loading, error,logout, setError,authorize, setAuthorize}}>
        {children}
    </AuthContext.Provider>
    )
}