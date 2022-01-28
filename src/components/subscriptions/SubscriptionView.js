import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getSubsByFollower } from "./SubscriptionManager"
import { SubscriptionPost } from "./SubscriptionPost"

export const SubscriptionList = () => {
    const [ subscriptions, setSubscriptions ] = useState([])
    const currentUserId = parseInt(localStorage.getItem('token'))

    useEffect(()=> {
        getSubsByFollower(currentUserId).then(p => setSubscriptions(p))
    }, [])

    
    
    return (
        <>
          <div className="card is-warning m-5">  
            <div className="subs">
                {
                    subscriptions.length === 0
                    ? <><p className="card-header-title is-center">You currently have no subscriptions :(</p><Link to="/users"> Find users you want to add! </Link></>
                    :subscriptions.map(subscription => <SubscriptionPost key={subscription.post.id} subscription={subscription} />)
                }
            </div>
            </div>
        </>
    )
}