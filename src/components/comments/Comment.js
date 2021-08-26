import React, { Component, Fragment } from 'react'

import { Redirect, withRouter } from 'react-router-dom'

// import specific function form api comment
import EditComment from './EditComment'
import { deleteComment } from '../../api/comments'

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

  // Delete function for comment
  onDestroyComment = (event) => {
    event.preventDefault()
    const { comment, user, postId, updateComments } = this.props
    // call deleteComment = (user, postId, commentId) => {
    deleteComment(user, postId, comment._id)
    updateComments(comment._id)
  }

  //

  render () {
    const { deleted, showEdit } = this.state
    const { comment, user, msgAlert, postId, updateComments } = this.props

    const modifyButtonsJsx = (
      <>
        {/* Button for delete show up */}
        <button onClick={this.onDestroyComment}>Delete comment</button>
        <button onClick={this.toggleEdit}>Edit</button>
      </>
    )

    const editCommentJsx = (
      <>
        <EditComment
          toggleEdit={this.toggleEdit}
          updateComments={updateComments}
          msgAlert={msgAlert}
          comment={comment}
          postId={postId}
          user={user}
        />
        <button onClick={this.toggleEdit}>Cancel</button>
      </>
    )

    if (deleted) {
      return <Redirect to={
        { pathname: '/home' }
      } />
    }

    return (
      <>
        <div><b>{comment.ownerName}</b>: {showEdit ? editCommentJsx : comment.content}</div>
        {comment.owner === user._id ? modifyButtonsJsx : ''}
      </>
    )
  }
}

export default withRouter(Comment)
