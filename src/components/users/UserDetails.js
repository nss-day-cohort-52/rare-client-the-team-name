import React, { useState, useEffect } from "react"
import { useParams, useHistory } from 'react-router-dom'
import { addSubscription, deleteSubscription, getSubsByFollower } from "../subscriptions/SubscriptionManager"

import { getSingleUser } from "./UserManager"

export const UserDetails = () => {
    const [user, setUser] = useState({})
    const [userSubscriptions, setUserSubscriptions] = useState([])
    const [subscriptionId, setSubscriptionId] = useState(0)
    const { userId } = useParams()
    const parsedId = parseInt(userId)
    const currentUserId = parseInt(localStorage.getItem('token'))
    const history = useHistory()

    useEffect(() => {
        getSingleUser(parsedId).then(setUser)
    }, [parsedId])

    useEffect(() => {
        getSubsByFollower(currentUserId).then(setUserSubscriptions)
    }, [currentUserId])

    useEffect(() => {
        const foundSubscription = userSubscriptions.find(sub => sub.author_id === parsedId)
        if (foundSubscription) {
            setSubscriptionId(foundSubscription.id)
        } else {
            setSubscriptionId(0)
        }
    }, [userSubscriptions])


    const newSubscription = () => {
        const date = new Date()
        addSubscription({
            follower_id: currentUserId,
            author_id: parsedId,
            created_on: date.toDateString()
        })
            .then(() => history.push("/"))
    }

    const subscribeButton = () => {
        if (user.id === currentUserId) {
            return ""
        } else if (subscriptionId === 0) {
            return <button type="submit" onClick={() => newSubscription()} className="button">
                Subscribe
            </button>
        } else if (subscriptionId !== 0) {
            return <button type="submit"
                onClick={() => {
                    deleteSubscription(subscriptionId)
                        .then(() => getSubsByFollower(currentUserId))
                        .then(setUserSubscriptions)
                }}
                className="btn btn-primary">
                Unsubscribe
            </button>
        }
    }

    return (
        <>
            <div className="card is-one-third">
                <div className="card-image">
                    {/* <figure class="image is-4by3"> */}
                        <img src={user.profile_image_url} alt="user profile image" />
                    {/* </figure> */}
                </div>
                <div className="media-content">
                    <p className="title is-4">{user.first_name} {user.last_name}</p>
                </div>
                <div className="content">
                    <div> Email: {user.email}</div>
                    <div> Bio: {user.bio} </div>
                    <div>Created on: {user.created_on}</div>
                    <div> Username: {user.username} </div>
                    {subscribeButton()}
                </div>
            </div>
        </>
    )
}