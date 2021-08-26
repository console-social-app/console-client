import React, { Component, Fragment } from 'react'

import { Redirect, withRouter } from 'react-router-dom'

import { deleteComment } from '../../api/comments'
import { deleteCommentSuccess, deleteCommentFailure } from '../AutoDismissAlert/messages'
import EditComment from './EditComment'

class Comment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: null,
      showEdit: false,
      deleted: false
    }
  }

  toggleEdit = () => {
    this.setState((prevState) => ({ showEdit: !prevState.showEdit }))
  }

  destroy = () => {
    const { user, msgAlert, postId, comment } = this.props
    console.log(comment)
    deleteComment(user, comment._id, postId)
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
    const { deleted, showEdit } = this.state
    const { comment, user, msgAlert, postId } = this.props

    const modifyButtonsJsx = (
      <>
        <button onClick={this.destroy}>Delete comment</button>
        <button onClick={this.toggleEdit}>Edit</button>
      </>
    )

    const editCommentJsx = (
      <>
        <EditComment
          msgAlert={msgAlert}
          user={user}
          comment={comment}
          postId={postId}
        />
        <button onClick={this.toggleEdit}>Cancel</button>
      </>
    )

    if (deleted) {
      return <Redirect to={
        { pathname: '/home' }
      } />
    }

    console.log(comment.ownerName)
    return (
      <>
        <div><b>{comment.ownerName}</b>: {showEdit ? editCommentJsx : comment.content}</div>
        {comment.owner === user._id ? modifyButtonsJsx : ''}
      </>
    )
  }
}

export default withRouter(Comment)
