import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createPost } from '../../api/posts'
import { createPostSuccess, createPostFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'

class CreatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      content: 'your code here',
      postId: null
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onCreatePost = (event) => {
    event.preventDefault()

    const { msgAlert, history, user, updatePosts } = this.props

    createPost(this.state, user)
      .then(res => this.setState({ postId: res.data.post._id }))
      .then(updatePosts({
        owner: user,
        title: this.state.title,
        content: this.state.content,
        comments: []
      }))
      .then(() => history.push('/home'))
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
    const { title } = this.state

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
            <Editor className="border"
              value={this.state.content}
              onValueChange={content => this.setState({ content })}
              highlight={content => highlight(content, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12
              }}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>Create</Button>
        </Form>
      </>
    )
  }
}

export default withRouter(CreatePost)
