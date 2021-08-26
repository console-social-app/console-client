import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EditComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deleted: false,
      content: ''
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  render () {
    const { deleted } = this.state
    const { comment } = this.props
    if (deleted) {
      return <Redirect to={
        { pathname: '/comments' }
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
              value={comment.content}
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
