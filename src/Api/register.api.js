async function register(credentials) {
    return fetch(`${process.env.REACT_APP_WORKER_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => 
        data.json()
    ).catch((err) => {
        throw new Error(err)
    })
}

export default register