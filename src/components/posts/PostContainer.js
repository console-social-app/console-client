import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import CreateComment from '../comments/CreateComment'
import Comments from '../comments/Comments'

class Post extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showComments: false
    }
  }

  toggleComments = () => {
    this.setState(prevState => {
      return { showComments: !prevState.showComments }
    })
  }

  render () {
    const { msgAlert, user, post } = this.props
    console.log(post)
    const { showComments } = this.state
    const commentsJsx = (
      <Comments msgAlert={msgAlert} user={user} comments={post.comments}/>
    )
    return (
      <>
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
        <p>{post.content}</p>
        <CreateComment msgAlert={msgAlert} user={user} postId={post._id} />
        <button onClick={this.toggleComments}>
          {showComments ? 'Hide Comments' : `Comments: ${post.comments.length}`}
        </button>
        {showComments ? commentsJsx : ''}
      </>
    )
  }
}

export default withRouter(Post)
