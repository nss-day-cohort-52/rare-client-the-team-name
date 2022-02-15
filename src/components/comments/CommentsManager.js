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
        method: "DELETE"
    }).then(getComments)
};

export const createComment = (newComment) => {
    
        const fetchOptions = {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        }
        return fetch(`http://localhost:8000/comments`, fetchOptions)
            .then(res => res.json())
    
}