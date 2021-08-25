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
      owner: '',
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

    const { msgAlert, history, user, postId } = this.props

    createComment(this.state, user, postId)
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
    const { content, commentId } = this.state

    if (commentId) {
      return <Redirect to={
        { pathname: '/comments/' + commentId }
      } />
    }

    return (
      <>
        <Form onSubmit={this.onCreateComment}>
          <Form.Group controlId='content'>
            <Form.Label>Add Comment</Form.Label>
            <Form.Control
              required
              name='content'
              value={content}
              placeholder='Comment'
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
