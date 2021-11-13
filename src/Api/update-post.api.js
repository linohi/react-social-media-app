async function updatePost(updateData) {
    return fetch(`${process.env.REACT_APP_WORKER_URL}/updatePost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    }).then(data => 
      data.json()
    ).catch((err) => {
      throw new Error(err)
    })
}

export default updatePost;