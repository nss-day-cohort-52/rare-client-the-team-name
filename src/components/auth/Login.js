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
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Level Up</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username address </label>
                        <input ref={username} type="username" id="username" className="form-control" placeholder="Username address" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
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


// import React, { useRef, useState } from "react"
// import { Link, useHistory } from "react-router-dom"
// import { loginUser } from "./AuthManager"

// export const Login = ({ setToken }) => {
//   const username = useRef()
//   const password = useRef()
//   const history = useHistory()
//   const [isUnsuccessful, setisUnsuccessful] = useState(false)

//   const handleLogin = (e) => {
//     e.preventDefault()

//     const user = {
//       username: username.current.value,
//       password: password.current.value
//     }

//     loginUser(user).then(res => {
//       if ("valid" in res && res.valid) {
//         setToken(res.token)
//         history.push("/")
//       }
//       else {
//         setisUnsuccessful(true)
//       }
//     })
//   }

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
