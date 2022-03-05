export const getReactions = () => {
    return fetch("https://rare-server.herokuapp.com/reactions", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const createReaction = reaction => {
    return fetch("https://rare-server.herokuapp.com/reactions", {
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
    return fetch(`https://rare-server.herokuapp.com/reactions/${id}`, {
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
    return fetch(`https://rare-server.herokuapp.com/reactions/${reactionId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
    
};

export const getPostReactions = () => {
    return fetch("https://rare-server.herokuapp.com/postreactions", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}
export const createPostReaction = postReaction => {
    return fetch("https://rare-server.herokuapp.com/postreactions", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postReaction)
    })
        .then(getPostReactions)
}