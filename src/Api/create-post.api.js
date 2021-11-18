async function createPost(postData) {
    return fetch(`${process.env.REACT_APP_WORKER_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(async data => {
      // data.json()
      // await data.text()
      let response = await data.text();
      if(response === "success") {
        return {
          status: 200,
        }
      } else {
        return {
          status: 500,
        }}
    }).catch((err) => {
      throw new Error(err)
    })
}

export default createPost;