
// export const getCertainPostTags = (postId) => {
//     return fetch(`http://localhost:8000/posttags?post_id=${postId}`, {
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("rare_token")}`
//         }
//     })
//         .then(res => res.json())
// }

// export const deletePostTag = postTagId => {
//     return fetch(`http://localhost:8000/posttags/${postTagId}`, {
//         method: "DELETE",
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("rare_token")}`
//         }
//     })
// };

// export const createPostTag = (postTag) => {
//     const fetchOptions = {
//         method: "POST",
//         headers: {
//             "content-Type": "application/json",
//             "Authorization": `Token ${localStorage.getItem("rare_token")}`
//         },
//         body: JSON.stringify(postTag)
//     }
//     return fetch(`http://localhost:8000/posttags`, fetchOptions)
//         .then(res => res.json())
// }
