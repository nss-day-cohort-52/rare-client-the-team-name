export const getCategories = () => {
    return fetch("https://rare-server.herokuapp.com/categories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const addCategory = categories => {
    return fetch("https://rare-server.herokuapp.com/categories", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categories)
    })
        .then(getCategories)
}

export const updateCategory = (category, id) => {
    return fetch(`https://rare-server.herokuapp.com/categories/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    })
        .then(getCategories)
}

export const deleteCategory = categoryId => {
    return fetch(`https://rare-server.herokuapp.com/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
    
};