import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { getCurrentUser, getSingleUser, subscribe, unsubscribe } from "./UserManager"

export const UserDetails = () => {
    const [author, setAuthor] = useState({})
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const { userId } = useParams()
    const date = author.user?.date_joined 
    const mdyDate = new Date(date).toLocaleString().split(",")[0] 
    
    useEffect(() => {
        getSingleUser(userId).then(setAuthor)
        getCurrentUser().then(setCurrentUser)
    }, [userId])

    useEffect(() => {
        const foundSubscription = currentUser.following?.find(userId => author.id === userId)
        if (foundSubscription) {
            setIsSubscribed(true)
        } else {
            setIsSubscribed(false)
        }
    }, [currentUser, author])


    const subscribeButton = () => {
        if (author.id === currentUser.id) {
            return ""
        } else if (isSubscribed === false) {
            return <button type="submit" onClick={() => {
                subscribe(author.id)
                    .then(getCurrentUser).then(setCurrentUser)
                    .then(() => getSingleUser(userId).then(setAuthor))
            }
                } className="button mr-3 mt-3">
                Subscribe
            </button>
        } else if (isSubscribed === true) {
            return <button type="submit"
                onClick={() => {
                    unsubscribe(author.id)
                    .then(getCurrentUser).then(setCurrentUser)
                    .then(() => getSingleUser(userId).then(setAuthor))
                }}
                className="button mr-3 mt-3">
                Unsubscribe
            </button>
        }
    }
    return (
        <>
            <div className="columns is-centered">

                <div className="column is-one-third">
                    <div className="card p-4 has-background-success is-flex">
                        <div>

                            <img src={author.profile_image_url} alt="user profile image" className="image is-128x128 mr-3" />
                            {subscribeButton()}
                            <div> Subscriber Count: {author.followers?.length} </div>
                        </div>
                        <div className="content">
                            <p className="title is-4">{author.user?.first_name} {author.user?.last_name}</p>
                            <div> Email: {author.user?.email}</div>
                            <div> Bio: {author.bio} </div>
                            <div>Created on: {mdyDate}</div>
                            <div> Username: {author.user?.username} </div>
                            <div> Permissions: {author.user?.is_staff ? "Admin" : "Author"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}