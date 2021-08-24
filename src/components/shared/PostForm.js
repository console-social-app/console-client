import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PostForm = ({ post, handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='title'>
      <Form.Label>Post Title</Form.Label>
      <Form.Control
        required
        name='title'
        value={post.title}
        placeholder='Post Title'
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId='content'>
      <Form.Label>Post Content</Form.Label>
      <Form.Control
        onChange={handleChange}
        required
        name='content'
        value={post.content}
        placeholder='Post Content'
      />
    </Form.Group>
    <Button type="submit">Submit</Button>
  </Form>

)

export default PostForm
