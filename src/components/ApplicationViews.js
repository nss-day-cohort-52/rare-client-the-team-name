import React from "react"
import { Route } from "react-router-dom"
import { PostList } from "./posts/PostList"
import { Categories } from "./categories/CategoryList"
import { PostDetails } from "./posts/PostDetails"
import { Tags } from "./tags/Tags"
import { MyPosts } from "./posts/myPosts"

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/">
        <h1 >Welcome to Rare Publishing</h1>
      </Route>
      <Route exact path="/posts">
        <PostList />
      </Route>
      <Route exact path="/my-posts">
        <MyPosts />
      </Route>
      <Route exact path="/posts/:postId(\d+)">
        <PostDetails />
      </Route>
      <Route path="/categories">
        <Categories />
      </Route>
      <Route path="/tags">
        <Tags />
      </Route>
    </>
  )
}
