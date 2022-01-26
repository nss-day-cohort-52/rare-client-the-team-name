export const getTags = () => {
    return fetch("http://localhost:8088/tags")
        .then(res => res.json())
}

export const getTagsByLabel = (string) => {
    return fetch(`http://localhost:8088/tags?q=${string}`)
        .then(res => res.json())
}

export const addTag = Tag => {
    return fetch("http://localhost:8088/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Tag)
    }).then(getTags);
};