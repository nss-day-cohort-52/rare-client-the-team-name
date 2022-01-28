import React from "react"
import { Link } from "react-router-dom"

export default ({ user }) => (
    <div className="column is-one-third">

    <div className="card has-background-primary">
                <div className="card-content m-6">
                    <figure className="image is-4by3">
                        <img src={user.profile_image_url} className="image is-rounded"></img>
                    </figure>
                        <Link className="title is-4" to={`/users/${user.id}`}>
                            {user.first_name} {user.last_name}
                        </Link>
                    <div> Username: {user.username} </div>
                    <div> Email: {user.email} </div>
                </div>
    </div>
    </div>
)

