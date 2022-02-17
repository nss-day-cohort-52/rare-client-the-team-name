import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { UploadPicForm } from "./UploadPicForm"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const bio = useRef()
    const url = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const history = useHistory()
    const [ string, setString ] = useState("")
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const getBase64 = (file, callback) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(file);
    }
  
    const createImageString = (event) => {
      getBase64(event.target.files[0], (base64ImageString) => {
          console.log("Base64 of file is", base64ImageString);
          // Update a component state variable to the value of base64ImageString
          setString(base64ImageString)
      });
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "email": email.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "profile_image_url": url.current.value,
                "profile_pic": string,
                "password": password.current.value
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("rare_token", res.token)
                        history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }



    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input ref={email} type="text" name="email" className="form-control" placeholder="Email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername">Username</label>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Add a bio </label>
                    <textarea ref={bio} name="bio" className="form-control" placeholder="Let other gamers know a little bit about you..." />
                </fieldset>
                <fieldset>
                    <label htmlFor="image"> Add an image URL </label>
                    <textarea ref={url} name="url" className="form-control" placeholder="Add a profile picture" />
                </fieldset>
                <section>
                  <input type="file" id="image" onChange={createImageString} />
                  <input type="hidden" name="id" value={string} />
                  {/* <button onClick={() => {
                    
                // Upload the stringified image that is stored in state
                      }}>Upload</button> */}
                </section>
                {/* <button className="button" onClick={() => {
                                    setModalIsOpen(true)
                                }}>Upload Profile Picture</button>
                                <div id="edit-modal" className={modalIsOpen ? "modal is-active" : "modal"}>
                                    <div className="modal-background"></div>

                                    <div className="modal-content">
                                        <div className="box">
                                            <UploadPicForm modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
                                        </div>
                                    </div>
                                </div> */}
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}





// import React, { useRef } from "react"
// import { Link } from "react-router-dom"
// import { useHistory } from "react-router-dom"
// import { registerUser } from "./AuthManager"

// export const Register = ({setToken}) => {
//   const firstName = useRef()
//   const lastName = useRef()
//   const email = useRef()
//   const username = useRef()
//   const bio = useRef()
//   const password = useRef()
//   const verifyPassword = useRef()
//   const passwordDialog = useRef()
//   const history = useHistory()

//   const handleRegister = (e) => {
//     e.preventDefault()
    
//     if (password.current.value === verifyPassword.current.value) {
//       const newUser = {
//         username: username.current.value,
//         first_name: firstName.current.value,
//         last_name: lastName.current.value,
//         email: email.current.value,
//         password: password.current.value,
//         bio: bio.current.value
//       }

//       registerUser(newUser)
//         .then(res => {
//           if ("valid" in res && res.valid) {
//             setToken(res.token)
//             history.push("/")
//           }
//         })
//     } else {
//       passwordDialog.current.showModal()
//     }
//   }

//   return (
//     <section className="columns is-centered">
//       <form className="column is-two-thirds" onSubmit={handleRegister}>
//       <h1 className="title">Rare Publishing</h1>
//         <p className="subtitle">Create an account</p>
//         <div className="field">
//           <label className="label">First Name</label>
//           <div className="control">
//             <input className="input" type="text" ref={firstName} />
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Last Name</label>
//           <div className="control">
//             <input className="input" type="text" ref={lastName} />
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Username</label>
//           <div className="control">
//             <input className="input" type="text" ref={username} />
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Email</label>
//           <div className="control">
//             <input className="input" type="email" ref={email} />
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Password</label>
//           <div className="field-body">
//             <div className="field">
//               <p className="control is-expanded">
//                 <input className="input" type="password" placeholder="Password" ref={password} />
//               </p>
//             </div>

//             <div className="field">
//               <p className="control is-expanded">
//                 <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Bio</label>
//           <div className="control">
//             <textarea className="textarea" placeholder="Tell us about yourself..." ref={bio}></textarea>
//           </div>
//         </div>

//         <div className="field is-grouped">
//           <div className="control">
//             <button className="button is-link" type="submit">Submit</button>
//           </div>
//           <div className="control">
//             <Link to="/login" className="button is-link is-light">Cancel</Link>
//           </div>
//         </div>

//       </form>
//     </section>
//   )
// }
