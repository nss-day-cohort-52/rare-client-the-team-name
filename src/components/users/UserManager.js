export const getUsers = () => {
    return fetch("https://rare-server.herokuapp.com/users", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleUser = (id) => {
    return fetch(`https://rare-server.herokuapp.com/users/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getCurrentUser = () => {
    return fetch(`https://rare-server.herokuapp.com/users/current`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getDemotionsByAdmin = (adminId) => {
    return fetch(`https://rare-server.herokuapp.com/demotions?adminId=${adminId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getDeactivationsByAdmin = (adminId) => {
    return fetch(`https://rare-server.herokuapp.com/deactivations?adminId=${adminId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const deleteDemotion = demotionId => {
    return fetch(`https://rare-server.herokuapp.com/demotions/${demotionId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
    
};

export const deleteDeactivation = deactivationId => {
    return fetch(`https://rare-server.herokuapp.com/deactivations/${deactivationId}`, {
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
    return fetch(`https://rare-server.herokuapp.com/demotions`, fetchOptions)
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
    return fetch(`https://rare-server.herokuapp.com/deactivations`, fetchOptions)
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
    return fetch(`https://rare-server.herokuapp.com/users/${id}/subscribe`, fetchOptions)
}

export const unsubscribe = (id) => {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }
    return fetch(`https://rare-server.herokuapp.com/users/${id}/unsubscribe`, fetchOptions)
}

export const activate = (id) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }
    return fetch(`https://rare-server.herokuapp.com/users/${id}/activate`, fetchOptions)
}

export const deactivate = (id) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }
    return fetch(`https://rare-server.herokuapp.com/users/${id}/deactivate`, fetchOptions)
}

export const makeAdmin = (id) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }
    return fetch(`https://rare-server.herokuapp.com/users/${id}/admin`, fetchOptions)
}

export const makeAuthor = (id) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    }
    return fetch(`https://rare-server.herokuapp.com/users/${id}/author`, fetchOptions)
}