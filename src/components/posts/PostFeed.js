import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { indexPosts } from '../../api/posts'
import { indexPostsFailure } from '../AutoDismissAlert/messages'

class Posts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: [],
      loading: false
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexPosts(user)
      .then(res => this.setState({
        posts: res.data.posts
      }))
      .catch(err => {
        msgAlert({
          heading: 'Couldn\'t Create Post',
          message: indexPostsFailure + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { posts } = this.state
    return (
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

export default Posts
