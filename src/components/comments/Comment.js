import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'

import { deleteComment } from '../../api/comments'
import { deleteCommentSuccess, deleteCommentFailure } from '../AutoDismissAlert/messages'

class Comment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: null,
      deleted: false
    }
  }

  destroy = () => {
    const { user, match, msgAlert } = this.props
    deleteComment(user, match.params.id)
      .then(() => {
        msgAlert({
          heading: 'Comment Deleted',
          message: deleteCommentSuccess,
          variant: 'success'
        })
      })
      .then(() => this.setState({ deleted: true }))
      .catch(err => {
        msgAlert({
          heading: 'Couldn\'t Delete Comment',
          message: deleteCommentFailure + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { deleted } = this.state
    const { comment } = this.props

    if (deleted) {
      return <Redirect to={
        { pathname: '/posts' }
      } />
    }

    return (
      <>
        <h4>{comment.ownerName}</h4>
        <p>{comment.content}</p>
        <button onClick={this.destroy}>Delete comment</button>
        <Link to={`/comments/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/comments">Back to all comments</Link>
      </>
    )
  }
}

export default withRouter(Comment)
