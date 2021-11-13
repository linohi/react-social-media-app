import { getToken } from "../SessionHandler/Session";

async function verifyToken(rid) {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/verify`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access_token': getToken()
        },
        credentials: 'include',
        mode: 'cors'
      }).then(data => {
        if(data.ok) {
            return {status: 200}
        } else {
            return {status: 401}
        }
        // data.json()
      }).catch((err) => {
        throw new Error(err)
      })
}

export default verifyToken;