import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createComment } from '../../../api/comments'
import { createCommentFailure } from '../../AutoDismissAlert/messages'
import uniqid from 'uniqid'

import Form from 'react-bootstrap/Form'

import './CreateComment.scss'

class CreateComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ownerName: props.user.username,
      content: '',
      created: false
    }
  }

  componentDidMount () {
    this.setState({ _id: uniqid() })
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onCreateComment = (event) => {
    event.preventDefault()

    const { msgAlert, user, postId, updateComments, showComments, toggleComments } = this.props
    const { content, _id } = this.state

    createComment(this.state, user, postId)
      .then(() =>
        updateComments({
          ownerName: user.username,
          owner: user._id,
          content,
          _id
        })
      )
      .then(() => { if (!showComments) toggleComments() })
      .then(() => { this.setState({ content: '' }) })
      .catch((err) => {
        msgAlert({
          heading: 'Couldn\'t Create Comment',
          message: createCommentFailure + err.message,
          variant: 'danger'
        })
      })
      .finally(() => {
        this.setState({ _id: uniqid() })
      })
  }

  render () {
    const { content } = this.state

    return (
      <>
        <Form onSubmit={this.onCreateComment}>
          <Form.Group>
            <Form.Control
              required
              autoComplete="off"
              className="commentInput"
              name='content'
              value={content}
              placeholder='Add Comment'
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
      </>
    )
  }
}

export default withRouter(CreateComment)
