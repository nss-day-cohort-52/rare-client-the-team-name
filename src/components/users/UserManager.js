export const getUsers = () => {
    return fetch("http://localhost:8000/users", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleUser = (id) => {
    return fetch(`http://localhost:8000/users/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getCurrentUser = () => {
    return fetch(`http://localhost:8000/users/current`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getDemotionsByAdmin = (adminId) => {
    return fetch(`http://localhost:8000/demotions?adminId=${adminId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getDeactivationsByAdmin = (adminId) => {
    return fetch(`http://localhost:8000/deactivations?adminId=${adminId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const deleteDemotion = demotionId => {
    return fetch(`http://localhost:8000/demotions/${demotionId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
    
};

export const deleteDeactivation = deactivationId => {
    return fetch(`http://localhost:8000/deactivations/${deactivationId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
    
};

export const createDemotion = (adminId) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        },
        body: JSON.stringify({admin: adminId})
    }
    return fetch(`http://localhost:8000/demotions`, fetchOptions)
        .then(res => res.json())
}

export const createDeactivation = (adminId) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        },
        body: JSON.stringify({admin: adminId})
    }
    return fetch(`http://localhost:8000/deactivations`, fetchOptions)
        .then(res => res.json())
}



export const subscribe = (id) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }
    return fetch(`http://localhost:8000/users/${id}/subscribe`, fetchOptions)
}

export const unsubscribe = (id) => {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }
    return fetch(`http://localhost:8000/users/${id}/unsubscribe`, fetchOptions)
}

export const activate = (id) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }
    return fetch(`http://localhost:8000/users/${id}/activate`, fetchOptions)
}

export const deactivate = (id) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }
    return fetch(`http://localhost:8000/users/${id}/deactivate`, fetchOptions)
}

export const makeAdmin = (id) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }
    return fetch(`http://localhost:8000/users/${id}/admin`, fetchOptions)
}

export const makeAuthor = (id) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }
    return fetch(`http://localhost:8000/users/${id}/author`, fetchOptions)
}