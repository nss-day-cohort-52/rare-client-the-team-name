import React from "react"
import { Link } from "react-router-dom"

export default ({ rareUser }) => (
    <div className="column is-one-third">

    <div className="card has-background-success">
                <div className="card-content m-6">
                    <figure className="image is-4by3">
                        <img src={rareUser.profile_image_url} className="image is-rounded"></img>
                    </figure>
                        <Link className="title is-4 is-underlined has-text-link" to={`/users/${rareUser.id}`}>
                            {rareUser.user.first_name} {rareUser.user.last_name}
                        </Link>
                    <div className="content has-text-white pt-4"> Username: {rareUser.user.username} </div>
                    <div className="content has-text-white"> {rareUser.user.is_staff ? "Admin" : "Author"} </div>
                </div>
    </div>
    </div>
)

