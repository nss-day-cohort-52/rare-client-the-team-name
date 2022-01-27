export const getSubscriptions = () => {
    return fetch("http://localhost:8088/subscriptions")
        .then(res => res.json())
}

export const addSubscription = subscription => {
    return fetch("http://localhost:8088/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
    })
        .then(getSubscriptions)
}

export const getSubsByFollower = (followerId) => {
    return fetch(`http://localhost:8088/subscriptions/${followerId}`)
        .then(res => res.json())
}