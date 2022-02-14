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
    const currentUserId = parseInt(localStorage.getItem('rare_token'))
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
            return <button type="submit" onClick={() => newSubscription()} className="button mr-3 mt-3">
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
            <div className="columns is-centered">

                <div className="column is-one-third">
                    <div className="card p-4 has-background-success is-flex">
                        <div>

                            <img src={user.profile_image_url} alt="user profile image" className="image is-128x128 mr-3" />
                            {subscribeButton()}
                        </div>
                        <div className="content">
                            <p className="title is-4">{user.first_name} {user.last_name}</p>
                            <div> Email: {user.email}</div>
                            <div> Bio: {user.bio} </div>
                            <div>Created on: {user.created_on}</div>
                            <div> Username: {user.username} </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}