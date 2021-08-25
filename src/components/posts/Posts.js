import React, { Component } from 'react'

import { indexPosts } from '../../api/posts'
import { indexPostsFailure } from '../AutoDismissAlert/messages'

import PostContainer from './PostContainer'
import CreatePost from './CreatePost'

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
        posts: res.data.posts.reverse()
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
      <div>
        <CreatePost msgAlert={this.msgAlert} user={user} />
        {posts.map(post => (
          <div className="border" key={post._id}>
            <PostContainer
              msgAlert={msgAlert}
              user={user}
              post={post}
              comments={post.comments}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default Posts
