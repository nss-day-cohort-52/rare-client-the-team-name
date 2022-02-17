import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("rare_token", res.token)
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="columns is-centered">
            <dialog ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="delete" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section className="column is-two-thirds">
                <form onSubmit={handleLogin}>
                    <h1 className="title">Level Up</h1>
                    <h2 className="subtitle">Please sign in</h2>
                    <fieldset className="field">
                        <label htmlFor="inputUsername" className="label"> Username address </label>
                        <div className="control">
                            <input ref={username} type="username" id="username" className="input" placeholder="Username address" required autoFocus />
                        </div>
                    </fieldset>
                    <fieldset className="field">
                        <label htmlFor="inputPassword" className="label"> Password </label>
                        <div className="control">
                            <input ref={password} type="password" id="password" className="input" placeholder="Password" required />
                        </div>
                    </fieldset>
                    <fieldset className="field">
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}


//   return (
//     <section className="columns is-centered">
//       <form className="column is-two-thirds" onSubmit={handleLogin}>
//         <h1 className="title">Rare Publishing</h1>
//         <p className="subtitle">Please sign in</p>

//         <div className="field">
//           <label className="label">Username</label>
//           <div className="control">
//             <input className="input" type="text" ref={username} />
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Password</label>
//           <div className="control">
//             <input className="input" type="password" ref={password} />
//           </div>
//         </div>

//         <div className="field is-grouped">
//           <div className="control">
//             <button className="button is-link" type="submit" >Submit</button>
//           </div>
//           <div className="control">
//             <Link to="/register" className="button is-link is-light">Cancel</Link>
//           </div>
//         </div>
//         {
//           isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
//         }
//       </form>
//     </section>
//   )
// }
