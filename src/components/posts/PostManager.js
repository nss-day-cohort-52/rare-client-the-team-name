export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
        .then(res => res.json())
}
export const getSinglePost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`)
        .then(res => res.json())
}

export const createPost = (post) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }
    return fetch(`http://localhost:8088/posts`, fetchOptions)
        .then(res => res.json())
}

export const updatePost = (post, id) => {
    return fetch(`http://localhost:8088/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
        .then(getPosts)
}
export const getPostsByCategory = (categoryId) => {
    return fetch(`http://localhost:8088/posts?category_id=${categoryId}`)
        .then(res => res.json())
}

export const deletePost = postId => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE"
    }).then(getPosts)
};

export const getPostsByAuthor = (authorId) => {
    return fetch(`http://localhost:8088/posts?user_id=${authorId}`)
        .then(res => res.json())
}

<<<<<<< HEAD
export const searchPostsByTitle = (searchTerm) => {
    return fetch(`http://localhost:8088/posts?q=${searchTerm}`)
    .then(res => res.json())
}
=======
export const getPostsByTag = (tagId) => {
    return fetch(`http://localhost:8088/posts?tag_id=${tagId}`)
        .then(res => res.json())
}
>>>>>>> main
