import React, { useState, useEffect } from "react"
import User from "./User"
import { getUsers } from "./UserManager"


export const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(
        () => {
            getUsers()
                .then((data) => {
                    setUsers(data)
                })
        },
        []
    )
    return (
        <div className="columns is-centered is-multiline">
            {
                users.map(user => <User key={user.id} user={user} />)
            }
        </div>
    )
}