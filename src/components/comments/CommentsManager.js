export const getComments = () => {
    return fetch("https://rare-server.herokuapp.com/comments", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const deleteComments = (id) => {
    return fetch (`https://rare-server.herokuapp.com/comments/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }).then(getComments)
};

export const createComment = (newComment) => {
    
        const fetchOptions = {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        }
        return fetch(`https://rare-server.herokuapp.com/comments`, fetchOptions)
            .then(getComments)
    
}

export const updateComment = (comment, id) => {
    return fetch(`https://rare-server.herokuapp.com/comments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        },
        body: JSON.stringify(comment)
    })
        .then(getComments)
}

export const getSingleComment = (id) => {
    return fetch(`https://rare-server.herokuapp.com/comments/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}