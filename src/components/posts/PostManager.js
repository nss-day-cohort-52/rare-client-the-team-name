export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}
export const getSinglePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const createPost = (post) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        },
        body: JSON.stringify(post)
    }
    return fetch(`http://localhost:8000/posts`, fetchOptions)
        .then(res => res.json())
}

export const updatePost = (post, id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        },
        body: JSON.stringify(post)
    })
        .then(getPosts)
}
export const getPostsByCategory = (categoryId) => {
    return fetch(`http://localhost:8000/posts?category_id=${categoryId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const deletePost = postId => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }).then(getPosts)
};

export const getPostsByAuthor = (authorId) => {
    return fetch(`http://localhost:8000/posts?user_id=${authorId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const searchPostsByTitle = (searchTerm) => {
    return fetch(`http://localhost:8000/posts?q=${searchTerm}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}
export const getPostsByTag = (tagId) => {
    return fetch(`http://localhost:8000/posts?tag_id=${tagId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getSubscribedPosts= () => {
    return fetch(`http://localhost:8000/posts/subscribed`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}
