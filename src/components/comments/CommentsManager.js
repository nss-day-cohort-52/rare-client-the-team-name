export const getComments = () => {
    return fetch("http://localhost:8000/comments", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const deleteComments = (id) => {
    return fetch (`http://localhost:8000/comments/${id}`, {
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
        return fetch(`http://localhost:8000/comments`, fetchOptions)
            .then(getComments)
    
}

export const updateComment = (comment, id) => {
    return fetch(`http://localhost:8000/comments/${id}`, {
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
    return fetch(`http://localhost:8000/comments/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}