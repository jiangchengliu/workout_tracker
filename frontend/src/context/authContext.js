import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    const [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const signUpUser = (username, email, password, password2) => {
        fetch('http://localhost:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                password2: password2
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message && data.message === "User registered!") {
                alert("Registered!")
                navigate('/login');
            } else {
                console.error("Registration error", data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    const loginUser = (username, password) => {
        fetch('http://localhost:8000/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`)
                }
                else {
                    return response.json()
                }
            })
            .then(data => {
                localStorage.setItem('authTokens', JSON.stringify(data));
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                navigate('/workouts')
            })
            .catch(error => {
                console.log(error);
                alert('Something went wrong while logging in.')
            });

    }

    const logoutUser = () => {
        localStorage.removeItem('authTokens');
        setAuthTokens(null);
        setUser(null);
        navigate('/');
    }

    const updateToken = () => {
        console.log("getting a new token...");
        fetch('http://localhost:8000/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: authTokens?.refresh }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`)
                }
                else {
                    return response.json()
                }
            })
            .then(data => {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));

                if(loading) {
                    setLoading(false);
                }

            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        if (loading && user) {
            updateToken();
        }
        const REFRESH_INTERVAL = 1000 * 60 * 9
        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, REFRESH_INTERVAL);

        return () => clearInterval(interval);

    }, [authTokens, loading])


    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        signUpUser: signUpUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}
