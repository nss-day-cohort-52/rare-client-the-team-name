import React from "react"
import { Route } from "react-router-dom"
import { Categories } from "./categories/categroyList"
import { Tags } from "./tags/Tags"

export const ApplicationViews = () => {
  return (
    <>
      {/* <h1 >Welcome to Rare Publishing</h1> */}
      <Route path="/categories">
        <Categories />
      </Route>
      <Route path="/tags">
        <Tags/>
      </Route>
    </>
  )
}
