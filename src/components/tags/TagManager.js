export const getTags = () => {
    return fetch("http://localhost:8000/tags", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getTagsByLabel = (string) => {
    return fetch(`http://localhost:8000/tags?q=${string}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const addTag = Tag => {
    return fetch("http://localhost:8000/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        },
        body: JSON.stringify(Tag)
    }).then(getTags);
};

export const updateTag = (tag, id) => {
    return fetch(`http://localhost:8000/tags/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        },
        body: JSON.stringify(tag)
    })
        .then(getTags)
}

export const deleteTag = tagId => {
    return fetch(`http://localhost:8000/tags/${tagId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }).then(getTags)
};