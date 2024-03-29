import React from "react"
import { Route } from "react-router-dom"
import { PostList } from "./posts/PostList"
import { Categories } from "./categories/CategoryList"
import { PostDetails } from "./posts/PostDetails"
import { Tags } from "./tags/Tags"
import { PostForm } from "./posts/PostForm"
import { TagView } from "./tags/TagView"
import { MyPosts } from "./posts/myPosts"
import { UserList } from "./users/UserList"
import { UserDetails } from "./users/UserDetails"
import { CommentList } from "./comments/CommentList"
import { EditPostForm } from "./posts/EditPostForm"
import { NewCommentForm } from "./comments/NewCommentForm"
import { SubscribedPostList } from "./posts/SubscribedPostList"
import { UpdateCommentForm } from "./comments/UpdateCommentForm"
import { Reactions } from "./reactions/ReactionList"

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/">
        <SubscribedPostList />
      </Route>
      <Route exact path="/posts">
        <PostList />
      </Route>
      <Route exact path="/users">
        <UserList />
      </Route>
      <Route exact path="/users/:userId(\d+)">
        <UserDetails />
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
      <Route path="/reactions">
        <Reactions />
      </Route>
      <Route path="/tags">
        <TagView />
      </Route>
      <Route path="/newpost">
        <PostForm />
      </Route>
      <Route exact path="/comments/:postId(\d+)">
        <CommentList />
      </Route>
      <Route exact path="/commentCreate/:postId(\d+)">
        <NewCommentForm />
      </Route>
      <Route path="/my-posts/editpost/:postId(\d+)">
        <EditPostForm />
      </Route>
      <Route exact path="/editcomments/:commentId(\d+)">
        <UpdateCommentForm />
      </Route>
    </>
  )
}
