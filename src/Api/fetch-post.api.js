import { checkAuth, getUser } from '../SessionHandler/Session';

async function getPost(postId) {
    let url = `${process.env.REACT_APP_WORKER_URL}/post/${postId}`
    if(checkAuth()) {
        url += `?username=${getUser()}`
    }
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(data => 
        data.json()
    ).catch((err) => {
        throw new Error(err)
    })
}

export default getPost;