import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { activate, deactivate, makeAdmin, makeAuthor, getUsers } from "./UserManager"

export const User = ({ rareUser, currentUser, setUsers }) => {
    const history = useHistory()
    const [deactivateRequest, setDeactivateRequest] = useState({
        bool: false,
        adminId: null
    })
    const [demoteRequest, setDemoteRequest] = useState(false)


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
                        Permissions: {rareUser.user.is_staff ? "Admin" : "Author"}
                    </div>
                    <div className="content has-text-white">
                        {rareUser.active
                            ? <>
                                <p> Status: Active</p>
                                {
                                    deactivateRequest.bool === true
                                        ? <>{
                                            deactivateRequest.adminId === currentUser.id
                                                ? <div className="notification is-link">You have requested deactivation</div>
                                                : <div className="notification is-link">
                                                    Deactivation has been requested.
                                                    <button
                                                        onClick={ () => deactivate(rareUser.id).then(getUsers).then(setUsers)}
                                                    >Approve</button> </div>
                                        }
                                        </>
                                        : <button
                                            onClick={() => {
                                                setDeactivateRequest({
                                                    bool: true,
                                                    adminId: currentUser.id
                                                })
                                            }
                                            }
                                        >Request Deactivate</button>
                                }
                            </>
                            : <>
                                <p> Status: Inactive</p>
                                <button
                                    onClick={
                                        activate(rareUser.id)
                                            .then(getUsers)
                                            .then(setUsers)
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

