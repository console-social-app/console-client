import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createComment } from '../../api/comments'
import { createCommentFailure } from '../AutoDismissAlert/messages'
import uniqid from 'uniqid'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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

    const { msgAlert, user, postId, updateComments } = this.props
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

    // if (created) {
    //   console.log('test')
    //   return <Redirect to={
    //     { pathname: '/posts/' }
    //   } />
    // }

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
