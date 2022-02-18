export const getReactions = () => {
    return fetch("http://localhost:8000/reactions", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const createReaction = reaction => {
    return fetch("http://localhost:8000/reactions", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reaction)
    })
    .then(getReactions)
}

export const updateReaction = (reaction, id) => {
    return fetch(`http://localhost:8000/reactions/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reaction)
    })
    .then(getReactions)
}

export const deleteReaction = reactionId => {
    return fetch(`http://localhost:8000/reactions/${reactionId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
    
};

export const getPostReactions = () => {
    return fetch("http://localhost:8000/postreactions", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}
export const createPostReaction = postReaction => {
    return fetch("http://localhost:8000/postreactions", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postReaction)
    })
        .then(getPostReactions)
}