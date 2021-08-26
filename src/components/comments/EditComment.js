import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { updateComment } from '../../api/comments'

class EditComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deleted: false,
      content: ''
    }
  }

  componentDidMount () {
    const { comment } = this.props
    this.setState({ content: comment.content })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onEditComment = (event) => {
    event.preventDefault()
    const { comment, user, postId, updateComments, toggleEdit } = this.props
    const { content } = this.state
    const newComment = { ...comment }
    newComment.content = content
    updateComment(newComment, user, postId)
    updateComments(newComment)
    toggleEdit()
  }

  render () {
    const { deleted, content } = this.state
    if (deleted) {
      return <Redirect to={
        { pathname: '/home' }
      } />
    }

    return (
      <>
        <Form onSubmit={this.onEditComment}>
          <Form.Group controlId='content'>
            <Form.Label>Edit Comment</Form.Label>
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

export default withRouter(EditComment)
