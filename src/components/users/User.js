import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { activate, deactivate, makeAdmin, makeAuthor, getUsers } from "./UserManager"

export const User = ({ rareUser, currentUser, setUsers }) => {
    const history = useHistory()

    return (
        <div className="column is-one-third">
            <div className="card has-background-success">
                <div className="card-content m-6">
                    <figure className="image is-4by3">
                        <img src={rareUser.profile_image_url} className="image is-rounded"></img>
                    </figure>
                    <Link className="title is-4 is-underlined has-text-link" to={`/users/${rareUser.id}`}>
                        {rareUser.user.first_name} {rareUser.user.last_name}
                    </Link>
                    <div className="content has-text-white pt-4">
                        Username: {rareUser.user.username}
                    </div>
                    <div className="content has-text-white">
                        Email: {rareUser.user.email}
                    </div>
                    <div className="content has-text-white">
                        {rareUser.user?.is_staff
                            ? <>
                                <p> Permissions: Admin</p>
                                <button
                                    className="button is-small"
                                    onClick={() =>
                                        makeAuthor(rareUser.id)
                                        .then((res)=> {
                                            if (res.status === 409){
                                                window.alert("Cannot be changed- this is the only active admin remaining")
                                            }
                                        })
                                        .then(getUsers).then(setUsers)
                                    }
                                >Demote</button>
                            </>
                            : <>
                                <p> Permissions: Author</p>
                                <button
                                    className="button is-small"
                                    onClick={() =>
                                        makeAdmin(rareUser.id)
                                        .then(getUsers).then(setUsers)
                                    }
                                >Promote</button>
                            </>
                        }
                    </div>
                    <div className="content has-text-white">
                        {rareUser.active
                            ? <>
                                <p> Status: Active</p>
                                <button
                                    className="button is-small"
                                    onClick={() =>
                                        deactivate(rareUser.id)
                                        .then((res)=> {
                                            if (res.status === 409){
                                                window.alert("Cannot be changed- this is the only active admin remaining")
                                            }
                                        })
                                        .then(getUsers).then(setUsers)
                                    }
                                >Deactivate</button>
                            </>
                            : <>
                                <p> Status: Inactive</p>
                                <button
                                    className="button is-small"
                                    onClick={() =>
                                        activate(rareUser.id)
                                        .then(getUsers).then(setUsers)
                                    }
                                >Activate</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

