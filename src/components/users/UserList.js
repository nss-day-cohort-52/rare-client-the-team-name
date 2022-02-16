import React, { useState, useEffect } from "react"
import { User } from "./User"
import { getUsers, getCurrentUser } from "./UserManager"


export const UserList = () => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    useEffect(
        () => {
            getUsers().then(setUsers)
            getCurrentUser().then(setCurrentUser)
        },
        []
    )
    return (
        <div className="columns is-centered is-multiline">
            {
                currentUser.user?.is_staff
                ? users.map(user => <User key={user.id} rareUser={user} currentUser={currentUser} setUsers={setUsers}/>)
                : <div className="pt-5 mt-5">You do not have permissions to view this page.</div>
            }
        </div>
    )
}