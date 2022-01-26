import React from "react"
import { Link } from "react-router-dom"

export default ({ user }) => (
    <section className="user">
        <h3 className="user_detail_link">
            <Link to={`/users/${user.id}`}>
                { user.firstName } {user.last_name}
            </Link>
        </h3>
        <div> {user.username} </div>
        <div> {user.email} </div>
    </section>
)