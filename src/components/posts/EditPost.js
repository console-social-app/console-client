import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { updatePost, showPost } from '../../api/posts'
import PostForm from '../shared/PostForm'

class UpdatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // using null as a starting value will help us manage the "loading state" of our UpdatePost component
      post: { // this should not be null
        title: '', // must provide starting values for the form inputs
        content: ''
      }
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { match, user, msgAlert } = this.props

    showPost(user, match.params.id)
      .then(res => this.setState({ post: res.data.post }))
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

    updatePost(this.state.post, user, match.params.id)
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
    return (
      <>
        <h3>Update One Post Page</h3>
        <PostForm
          post={this.state.post}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </>
    )
  }
}

export default withRouter(UpdatePost)
