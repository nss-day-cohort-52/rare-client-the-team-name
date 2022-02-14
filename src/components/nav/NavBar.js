import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
  const history = useHistory()
  const navbar = useRef()
  const hamburger = useRef()

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  return (
    <nav className="navbar is-success mb-3 py-2" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} height="3rem" /> <h1 className="title is-4 ml-2">Rare Publishing</h1>
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {
            localStorage.getItem('rare_token')
              ?
              <>
              <Link to="/posts" className="navbar-item has-text-weight-semibold">Posts</Link>
              <Link to="/my-posts" className="navbar-item has-text-weight-semibold">My Posts</Link>
              <Link to="/newpost" className="navbar-item has-text-weight-semibold">New Post</Link>
              <Link to="/tags" className="navbar-item has-text-weight-semibold">Tag Management</Link>
              <Link to="/categories" className="navbar-item has-text-weight-semibold">Category Management</Link>
              <Link to="/users" className="navbar-item has-text-weight-semibold">User List</Link>
              </>
              :
              ""
            }
          
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                localStorage.getItem('rare_token')
                  ?
                  <button className="button is-outlined" onClick={() => {
                    localStorage.removeItem('rare_token')
                    history.push('/login')
                  }}>Logout</button>
                  :
                  <>
                    <Link to="/register" className="button is-link">Register</Link>
                    <Link to="/login" className="button is-outlined">Login</Link>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
