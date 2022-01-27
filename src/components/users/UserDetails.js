import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { addSubscription } from "../subscriptions/SubscriptionManager"

import { getSingleUser } from "./UserManager"

export const UserDetails = () => {
    const [user, setUser] = useState({})
    const { userId } = useParams()
    const parsedId = parseInt(userId)
    const currentUserId = parseInt(localStorage.getItem('token'))

    useEffect(() => {
        getSingleUser(parsedId)
            .then(setUser)
    }, [parsedId])

    const newSubscription = () => {
        const date = new Date()
        addSubscription({
            follower_id: currentUserId,
            author_id: parsedId,
            created_on: date.toDateString()
            })
            .then(() => history.push("/"))
    }

    return (
        <>
            <div className="user-image">
                <img src={user.profile_image_url} alt="user profile image" />
            </div>
            <section className="user-detail">
                <h3 className="user-name">{user.first_name} {user.last_name}</h3>
                <div> Email: {user.email}</div>
                <div> Bio: {user.bio} </div>
                <div>Created on: {user.created_on}</div>
                <div> Username: {user.username} </div>
            </section>
            <button type="submit" onClick={() => newSubscription()}className="btn btn-primary">
                        Subscribe
                    </button>
        </>
    )
}