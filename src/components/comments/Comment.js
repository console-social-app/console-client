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
    const { comment, user } = this.props

    const modifyButtonsJsx = (
      <>
        <button onClick={this.destroy}>Delete comment</button>
        <Link to={`/comments/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
      </>
    )

    if (deleted) {
      return <Redirect to={
        { pathname: '/posts' }
      } />
    }

    console.log(comment.ownerName)
    return (
      <>
        <p><b>{comment.ownerName}</b>: {comment.content}</p>
        {comment.owner === user._id ? modifyButtonsJsx : ''}
      </>
    )
  }
}

export default withRouter(Comment)
