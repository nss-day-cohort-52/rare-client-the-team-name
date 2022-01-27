export const getComments = () => {
    return fetch("http://localhost:8088/comments")
        .then(res => res.json())
}

export const deleteComments = (id) => {
    return fetch (`http://localhost:8088/comments/${id}`, {
        method: "DELETE"
    }).then(getComments)
};