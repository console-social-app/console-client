import React, { Component, Fragment } from 'react'

import { Link, Redirect, withRouter } from 'react-router-dom'

import EditComment from '../EditComment'
import { deleteComment } from '../../../api/comments'

import Button from 'react-bootstrap/Button'
import './Comment.scss'

class Comment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: null,
      showEdit: false,
      showButtons: false,
      deleted: false
    }
  }

  toggle = (property) => {
    this.setState((prevState) => ({ [property]: !prevState[property] }))
  }

  onDestroyComment = (event) => {
    event.preventDefault()
    const { comment, user, postId, updateComments } = this.props
    deleteComment(user, postId, comment._id)
    updateComments(comment._id)
  }

  //

  render () {
    const { deleted, showEdit, showButtons } = this.state
    const { comment, user, msgAlert, postId, updateComments } = this.props
    const renderButtons = (comment.owner === user._id && showButtons && !showEdit)

    const modifyButtonsJsx = (
      <>
        <Button
          size='sm'
          variant='secondary'
          className="commentButton"
          onClick={() => this.toggle('showEdit')}>
          Edit
        </Button>
        <Button
          size='sm'
          variant='danger'
          className="commentButton"
          onClick={this.onDestroyComment}>
          Delete
        </Button>
      </>
    )

    const editCommentJsx = (
      <>
        <EditComment
          toggle={this.toggle}
          updateComments={updateComments}
          msgAlert={msgAlert}
          comment={comment}
          postId={postId}
          user={user}
        />
        <Button size='sm' variant='danger' onClick={() => this.toggle('showEdit')}>Cancel</Button>
      </>
    )

    if (deleted) {
      return <Redirect to={
        { pathname: '/home' }
      } />
    }

    return (
      <>
        <div onClick={() => this.toggle('showButtons')}>
          <div className="comment">
            <Link className="commentOwner">{comment.ownerName}</Link>
            {showEdit ? editCommentJsx : comment.content}
            {renderButtons ? modifyButtonsJsx : ''}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Comment)
