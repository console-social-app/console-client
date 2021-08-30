import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
// API request
import { updatePost, showPost } from '../../../api/posts'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'

import './EditPost.scss'

class UpdatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // using null as a starting value will help us manage the "loading state" of our UpdatePost component
      title: '', // must provide starting values for the form inputs
      content: ''
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { match, user, msgAlert } = this.props

    showPost(user, match.params.id)
      .then(res => this.setState({ title: res.data.post.title, content: res.data.post.content }))
      .then(() => msgAlert({
        heading: 'Show post success',
        message: 'Check out the post',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Show post failed :(',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }

  handleChange = (event) => {
    // because `this.state.post` is an object with multiple keys, we have to do some fancy updating
    const userInput = { [event.target.name]: event.target.value }
    this.setState(currState => {
      // "Spread" out current post state key/value pairs, then add the new one at the end
      // this will override the old key/value pair in the state but leave the others untouched
      return { post: { ...currState.post, ...userInput } }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, msgAlert, history, match } = this.props

    updatePost(this.state, user, match.params.id)
      .then(res => history.push('/posts/' + match.params.id))
      .then(() => msgAlert({ heading: 'Post Updated!', message: 'Nice work, go check out your post.', variant: 'success' }))
      .catch(err => {
        msgAlert({
          heading: 'Post update failed :(',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { title, content } = this.state
    const { match } = this.props

    return (
      <>
        <h5 id="updatePostHeader">Edit Post</h5>
        <div className='postContainer'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId='title'>
              <Form.Control
                required
                className='titleInput'
                name='title'
                value={title}
                placeholder='Post Title'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='content'>
              <Editor className="border codeEditor"
                value={content}
                onValueChange={content => this.setState({ content })}
                highlight={content => highlight(content, languages.js)}
                padding={10}
              />
            </Form.Group>
            <Button id='updatePostButton' variant='primary' type='submit'>Update</Button>
          </Form>
        </div>
        <Link to={`/posts/${match.params.id}`}>
          <Button size='sm' className='btn'>Go back</Button>
        </Link>
      </>
    )
  }
}

export default withRouter(UpdatePost)
