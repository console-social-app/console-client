import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { createPost } from '../../api/posts'
import { createPostSuccess, createPostFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      content: '',
      postId: null
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onCreatePost = (event) => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    createPost(this.state, user)
      .then(res => this.setState({ postId: res.data.post._id }))
      .then(() => history.push('/'))
      .then(() => {
        msgAlert({
          heading: 'Post Created',
          message: createPostSuccess,
          variant: 'success'
        })
      })
      .catch((err) => {
        msgAlert({
          heading: 'Couldn\'t Create Post',
          message: createPostFailure + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { title, content, postId } = this.state

    if (postId) {
      return <Redirect to={
        { pathname: '/posts/' + postId }
      } />
    }

    return (
      <>
        <h3>Create Post</h3>
        <Form onSubmit={this.onCreatePost}>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              name='title'
              value={title}
              placeholder='Post Title'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='content'>
            <Form.Label>Content</Form.Label>
            <Form.Control
              required
              name='content'
              value={content}
              placeholder='Content'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>Create</Button>
        </Form>
      </>
    )
  }
}

export default withRouter(CreatePost)
