import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'

import { deletePost, showPost } from '../../api/posts'
import { showPostFailure, deletePostSuccess, deletePostFailure } from '../AutoDismissAlert/messages'

import Button from 'react-bootstrap/Button'
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
    const { user } = this.props

    const modifyButtonsJsx = (
      <>
        <Link to={`/posts/${this.props.match.params.id}/edit`}>
          <Button size='sm' variant='primary'>Edit</Button>
        </Link>
        <Button size='sm' variant='danger' onClick={this.destroy}>Delete post</Button>
      </>
    )

    if (!post) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/home' }
      } />
    }

    return (
      <>
        <h4>{post.owner.username}</h4>
        <h4>{post.title}</h4>
        <p>{post.content}</p>
        <Link to="/home">
          <Button size='sm' className='btn'>Go back</Button>
        </Link>
        {post.owner._id === user._id ? modifyButtonsJsx : ''}
      </>
    )
  }
}

export default withRouter(Post)
