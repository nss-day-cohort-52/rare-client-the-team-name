import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { activate, deactivate, makeAdmin, makeAuthor, getUsers, getDeactivationsByAdmin, createDemotion, createDeactivation, deleteDemotion, getDemotionsByAdmin, deleteDeactivation } from "./UserManager"

export const User = ({ rareUser, currentUser, setUsers }) => {
    const [adminDeactivation, setAdminDeactivation] = useState(null)
    const [adminDemotion, setAdminDemotion] = useState(null)

    useEffect(() => {
        if (rareUser.user?.is_staff) {
            getDeactivationsByAdmin(rareUser.id)
                .then((res) => {
                    if (res[0]) {
                        setAdminDeactivation(res[0])
                    }
                })
            getDemotionsByAdmin(rareUser.id)
                .then((res) => {
                    if (res[0]) {
                        setAdminDemotion(res[0])
                    }
                })
        }
    }, []
    )

    const canDeactivate = () => {
        if (rareUser.user.is_staff && rareUser.active && adminDeactivation?.requester !== currentUser.id) {
            return true
        } else if (rareUser.user.is_staff === false && rareUser.active) {
            return true
        } else {
            return false
        }
    }


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
                        {
                            //Permissions promotion/demotions
                            rareUser.user.is_staff && adminDemotion === null
                                ? <>
                                    <p> Permissions: Admin</p>
                                    <button
                                        className="button is-small"
                                        onClick={() =>
                                            //This will need extra approval
                                            createDemotion(rareUser.id)
                                                .then(() => getDemotionsByAdmin(rareUser.id)
                                                    .then((res) => {
                                                        if (res[0]) {
                                                            setAdminDemotion(res[0])
                                                        }
                                                    }))
                                        }
                                    >Request Demote</button>
                                </>
                                : rareUser.user.is_staff && adminDemotion?.requester !== currentUser.id
                                    ? <>
                                        <p> Permissions: Admin</p>
                                        <div className="notification is-link p-1"> Demotion Requested</div>
                                        <button
                                            className="button is-small"
                                            onClick={() =>
                                                makeAuthor(rareUser.id)
                                                    .then((res) => {
                                                        if (res.status === 409) {
                                                            window.alert("Cannot be changed- this is the only active admin remaining")
                                                        } else {
                                                            deleteDemotion(adminDemotion.id)
                                                                .then(() => setAdminDemotion(null))
                                                        }
                                                    })
                                                    .then(getUsers).then(setUsers)
                                            }
                                        > Demote</button>
                                    </>
                                    : adminDemotion?.requester === currentUser.id
                                        ? <div className="notification is-link p-1 m-0"> You have requested demotion</div>
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
                        {
                            //Permissions promotion/demotions
                            rareUser.user.is_staff && adminDeactivation === null && rareUser.active
                                ? <>
                                    <p> Status: Active</p>
                                    <button
                                        className="button is-small"
                                        onClick={() =>
                                            //This will need extra approval
                                            createDeactivation(rareUser.id)
                                                .then(() => getDeactivationsByAdmin(rareUser.id)
                                                    .then((res) => {
                                                        if (res[0]) {
                                                            setAdminDeactivation(res[0])
                                                        }
                                                    }))
                                        }
                                    >Request Deactivation</button>
                                </>
                                : canDeactivate()
                                    ? <>
                                        <p> Status: Active</p>
                                        {
                                            rareUser.user?.is_staff 
                                            ? <div className="notification is-link p-1"> Deactivation Requested</div>
                                            : ""
                                        }
                                        <button
                                            className="button is-small"
                                            onClick={() =>
                                                //This will need extra approval
                                                deactivate(rareUser.id)
                                                    .then((res) => {
                                                        if (res.status === 409) {
                                                            window.alert("Cannot be changed- this is the only active admin remaining")
                                                        } else if (rareUser.user?.is_staff) {
                                                            deleteDeactivation(adminDeactivation.id)
                                                                .then(() => setAdminDeactivation(null))
                                                        }
                                                    })
                                                    .then(getUsers).then(setUsers)
                                            }
                                        > Deactivate</button>
                                    </>
                                    : adminDeactivation?.requester === currentUser.id
                                        ? <div className="notification is-link p-1 m-0"> You have requested deactivation</div>
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

