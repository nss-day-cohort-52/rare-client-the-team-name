import React, { useState, useEffect } from "react"
import User from "./User"


export const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/users")
                .then(res => res.json())
                .then((data) => {
                    setUsers(data)
                })
        },
        []
    )
    return (
        <div className="users">
            {
                users.map(user => <User key={user.id} user={user} />)
            }
        </div>
    )
}