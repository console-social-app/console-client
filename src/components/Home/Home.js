import React, { Component } from 'react'

import { indexPosts } from '../../api/posts'
import { indexPostsFailure } from '../AutoDismissAlert/messages'

import PostContainer from '../posts/PostContainer/PostContainer'
import CreatePost from '../posts/CreatePost'

class Home extends Component {
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

  updatePosts = (post) => {
    this.setState(prevState => {
      return { posts: [...prevState.posts, post] }
    })
  }

  render () {
    const { posts } = this.state
    const { user, msgAlert } = this.props
    return (
      <div>
        <CreatePost updatePosts={this.updatePosts} msgAlert={msgAlert} user={user} />
        {posts.map(post => (
          <div key={post._id}>
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

export default Home
