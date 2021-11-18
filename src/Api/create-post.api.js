async function createPost(postData) {
    return fetch(`${process.env.REACT_APP_WORKER_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(data => 
      data.json()
    ).catch((err) => {
      throw new Error(err)
    })
}

export default createPost;