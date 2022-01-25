import React from "react"
import { Route } from "react-router-dom"
import { Tags } from "./tags/Tags"

export const ApplicationViews = () => {
  return (
    <>
    <Route path="/tags">
      <Tags/>
    </Route>
    </>
  )
}
