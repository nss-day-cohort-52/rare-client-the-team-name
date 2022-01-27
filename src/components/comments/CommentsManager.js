export const getComments = () => {
    return fetch("http://localhost:8088/comments")
        .then(res => res.json())
}
