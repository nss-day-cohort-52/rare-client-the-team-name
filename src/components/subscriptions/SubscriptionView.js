import React, { useState, useEffect } from "react"



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
            
            <div className="subs">
                {
                    subscriptions.map(subscription => <SubscriptionPost key={subscription.post.id} subscription={subscription} />)
                }
            </div>
        </>
    )
}