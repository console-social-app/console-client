import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import CreateComment from '../comments/CreateComment'
import Comments from '../comments/Comments'

class PostContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comments: [],
      showComments: false
    }
  }

  updateComments = (comment) => {
    this.setState(prevState => {
      return { comments: [...prevState.comments, comment] }
    })
  }

  componentDidMount () {
    const { post } = this.props
    this.setState({ comments: post.comments })
  }

  toggleComments = () => {
    this.setState(prevState => {
      return { showComments: !prevState.showComments }
    })
  }

  render () {
    const { msgAlert, user, post } = this.props
    const { showComments, comments } = this.state
    const commentsJsx = (
      <Comments msgAlert={msgAlert} user={user} comments={comments}/>
    )
    return (
      <>
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
        <p>{post.content}</p>
        <CreateComment
          updateComments={this.updateComments}
          msgAlert={msgAlert}
          user={user}
          postId={post._id}
        />
        <button onClick={this.toggleComments}>
          {showComments ? 'Hide Comments' : `Comments: ${comments.length}`}
        </button>
        {showComments ? commentsJsx : ''}
      </>
    )
  }
}

export default withRouter(PostContainer)
