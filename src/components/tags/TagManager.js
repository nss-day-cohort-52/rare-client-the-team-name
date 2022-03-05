export const getTags = () => {
    return fetch("https://rare-server.herokuapp.com/tags", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getTagsByLabel = (string) => {
    return fetch(`https://rare-server.herokuapp.com/tags?q=${string}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const addTag = Tag => {
    return fetch("https://rare-server.herokuapp.com/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        },
        body: JSON.stringify(Tag)
    }).then(getTags);
};

export const updateTag = (tag, id) => {
    return fetch(`https://rare-server.herokuapp.com/tags/${id}`, {
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
    return fetch(`https://rare-server.herokuapp.com/tags/${tagId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }).then(getTags)
};