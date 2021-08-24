import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { createComment } from '../../api/comments'
import { createCommentSuccess, createCommentFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      content: '',
      commentId: null
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onCreateComment = (event) => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    createComment(this.state, user)
      .then(res => this.setState({ commentId: res.data.comment._id }))
      .then(() => history.push('/'))
      .then(() => {
        msgAlert({
          heading: 'Comment Created',
          message: createCommentSuccess,
          variant: 'success'
        })
      })
      .catch((err) => {
        msgAlert({
          heading: 'Couldn\'t Create Comment',
          message: createCommentFailure + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { title, content, commentId } = this.state

    if (commentId) {
      return <Redirect to={
        { pathname: '/comments/' + commentId }
      } />
    }

    return (
      <>
        <h3>Create Comment</h3>
        <Form onSubmit={this.onCreateComment}>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              name='title'
              value={title}
              placeholder='Comment Title'
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

export default withRouter(CreateComment)
