import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'

import { deletePost, showPost } from '../../api/posts'
import { showPostFailure, deletePostSuccess, deletePostFailure } from '../AutoDismissAlert/messages'

import Spinner from 'react-bootstrap/Spinner'

class Post extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    console.log(match.params.id)

    showPost(user, match.params.id)
      .then(res => this.setState({ post: res.data.post }))
      .catch(err => {
        msgAlert({
          heading: 'Couldn\'t Create Post',
          message: showPostFailure + err.message,
          variant: 'danger'
        })
      })
  }

  destroy = () => {
    const { user, match, msgAlert } = this.props
    deletePost(user, match.params.id)
      .then(() => {
        msgAlert({
          heading: 'Post Deleted',
          message: deletePostSuccess,
          variant: 'success'
        })
      })
      .then(() => this.setState({ deleted: true }))
      .catch(err => {
        msgAlert({
          heading: 'Couldn\'t Delete Post',
          message: deletePostFailure + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { post, deleted } = this.state

    if (!post) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/posts' }
      } />
    }

    return (
      <>
        <h4>{post.title}</h4>
        <p>{post.content}</p>
        <button onClick={this.destroy}>Delete post</button>
        <Link to={`/posts/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/posts">
          <button>Back to all posts</button>
        </Link>
      </>
    )
  }
}

export default withRouter(Post)
