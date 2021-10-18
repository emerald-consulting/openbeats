import axios from 'axios'
const baseURL = process.env.NODE_ENV === 'production'? 'https://api.openbeats716.com/api' : "http://localhost:8000/api"

/* Each time Axios gets a token, it stores the access_token in local storage. 
We initiate the creation of the Axios instance by getting that token. 
If there’s no token in local storage, don’t even worry about it for the header. It will be set every time a user logs in. */
export const http = axios.create({
    baseURL: baseURL,
    timeout: 5000,

    /* In settings.py the SIMPLE_JWT dict sets the AUTH_HEADER_TYPES as ‘JWT'
    so for the Authorization header here it has to be the same. */
    headers: {
        'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


export const isUserLoggedIn = async () => {
    const { data } = await http.get<string>("/user/isLoggedIn/");
    return data === "User logged in";
}


http.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === baseURL + 'token/refresh/') {
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized") {
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return http
                        .post('/token/refresh/', { refresh: refreshToken })
                        .then((response) => {

                            localStorage.setItem('access_token', response.data.access);
                            localStorage.setItem('refresh_token', response.data.refresh);

                            http.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;

                            return http(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                            return error.response.status
                        });
                } else {
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    window.location.href = '/login/';
                    return error.response.status

                }
            } else {
                console.log("Refresh token not available.")
                window.location.href = '/login/';
                return error.response.status

            }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);