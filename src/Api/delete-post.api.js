async function deletePost(postId) {
    return fetch(`${process.env.REACT_APP_WORKER_URL}/post`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({postId: postId})
    }).then(data => 
      data.json()
    ).catch((err) => {
      throw new Error(err)
    })
}

export default deletePost;