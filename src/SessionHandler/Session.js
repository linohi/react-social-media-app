import Cookies from 'js-cookie'

export const checkAuth = () => {
    let token = Cookies.get('auth')//sessionStorage.getItem("access_token");
    if(!token) return false;
    else return true;
}

export const getToken = () => {
    let token = Cookies.get('auth')//sessionStorage.getItem("access_token");
    if(!token) return false;
    return token
}

export const setAuth = (username, token) => {
    Cookies.set("auth", token, {expires: 1});
    Cookies.set("username", username, {expires: 1});
}

export const getUser = () => {
    return Cookies.get("username");
}

export const logout = () => {
    Cookies.remove("username");
    Cookies.remove('auth')
}
