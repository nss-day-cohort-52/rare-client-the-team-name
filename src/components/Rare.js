import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import 'bulma/css/bulma.min.css'

export const Rare = () => (
  <>
    <Route render={() => {
      if (localStorage.getItem("rare_token")) {
        return <>
          <Route>
            <NavBar />
            <ApplicationViews />
          </Route>
        </>
      } else {
        return <Redirect to="/login" />
      }
    }} />

    <Route path="/login">
      <NavBar />
      <Login />
    </Route>

    <Route path="/register">
      <NavBar />
      <Register />
    </Route>

  </>
)
