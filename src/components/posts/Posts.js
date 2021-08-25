import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { indexPosts } from '../../api/posts'
import { indexPostsFailure } from '../AutoDismissAlert/messages'

import CreateComment from '../comments/CreateComment'
import Comments from '../comments/Comments'

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
    const { user, msgAlert } = this.props
    return (
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
            <p>{post.content}</p>
            <CreateComment msgAlert={msgAlert} user={user} postId={post._id} />
            <Comments msgAlert={msgAlert} user={user} comments={post.comments}/>
          </li>
        ))}
      </ul>
    )
  }
}

export default Posts
