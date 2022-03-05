export const getPosts = () => {
    return fetch("https://rare-server.herokuapp.com/posts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}
export const getSinglePost = (id) => {
    return fetch(`https://rare-server.herokuapp.com/posts/${id}`, {
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
    return fetch(`https://rare-server.herokuapp.com/posts`, fetchOptions)
        .then(res => res.json())
}

export const updatePost = (post, id) => {
    return fetch(`https://rare-server.herokuapp.com/posts/${id}`, {
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
    return fetch(`https://rare-server.herokuapp.com/posts?category_id=${categoryId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const deletePost = postId => {
    return fetch(`https://rare-server.herokuapp.com/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }).then(getPosts)
};

export const getPostsByAuthor = (authorId) => {
    return fetch(`https://rare-server.herokuapp.com/posts?user_id=${authorId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const searchPostsByTitle = (searchTerm) => {
    return fetch(`https://rare-server.herokuapp.com/posts?q=${searchTerm}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}
export const getPostsByTag = (tagId) => {
    return fetch(`https://rare-server.herokuapp.com/posts?tag_id=${tagId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getSubscribedPosts= () => {
    return fetch(`https://rare-server.herokuapp.com/posts/subscribed`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const postTagEdit = (tags, id) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        },
        body: JSON.stringify(tags)
    }
    return fetch(`https://rare-server.herokuapp.com/posts/${id}/edit_tags`, fetchOptions)
}
export const getApprovedPosts= () => {
    return fetch(`https://rare-server.herokuapp.com/posts?approved=True`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const approvePost = (postId) => {
    return fetch(`https://rare-server.herokuapp.com/posts/${postId}/approve`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }).then(getPosts)
}

export const unapprovePost = (postId) => {
    return fetch(`https://rare-server.herokuapp.com/posts/${postId}/unapprove`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }).then(getPosts)
}

