export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
        .then(res => res.json())
}
export const getSinglePost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`)
        .then(res => res.json())
}

export const deletePost = postId => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
      method: "DELETE"
    }).then(getPosts)
  };
export const getCertainPostTags = (postId) => {
  return fetch(`http://localhost:8088/posttags?post_id=${postId}`)
    .then(res => res.json())
}