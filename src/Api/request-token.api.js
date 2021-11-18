async function requestToken(username) {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Origin": "http://localhost:3000"
      },
      // body: JSON.stringify({rid}),
      credentials: 'include'
    }).then(async data => {
      if(data.ok) {
        // let responseData = await data.json();
        return {
          status: 200,
          data: data.headers.get("Authorization")
        }
      } else {
        // let responseData = await data.text();
        return {
          status: 500,
          data: "Error while completing auth!"
        }
      }
    }).catch((err) => {
      throw new Error(err)
    })
}

export default requestToken