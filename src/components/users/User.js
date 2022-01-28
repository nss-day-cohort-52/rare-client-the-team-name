import React from "react"
import { Link } from "react-router-dom"

export default ({ user }) => (
    <div className="card">
                <div className="card-content  m-6">
                        <Link className="title is-4" to={`/users/${user.id}`}>
                            {user.first_name} {user.last_name}
                        </Link>
                    <div> {user.username} </div>
                    <div> {user.email} </div>
                </div>
    </div>
)

