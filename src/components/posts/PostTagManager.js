
export const getCertainPostTags = (postId) => {
    return fetch(`http://localhost:8088/posttags?post_id=${postId}`)
        .then(res => res.json())
}

export const deletePostTag = postTagId => {
    return fetch(`http://localhost:8088/posttags/${postTagId}`, {
        method: "DELETE"
    })
};

export const createPostTag = (postTag) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(postTag)
    }
    return fetch(`http://localhost:8088/posttags`, fetchOptions)
        .then(res => res.json())
}