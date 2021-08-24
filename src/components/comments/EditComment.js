import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'

import { deleteComment, showComment } from '../../api/comments'
import { showCommentFailure, deleteCommentSuccess, deleteCommentFailure } from '../AutoDismissAlert/messages'

import Spinner from 'react-bootstrap/Spinner'

class EditComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    showComment(user, match.params.id)
      .then(res => this.setState({ comment: res.data.comment }))
      .catch(err => {
        msgAlert({
          heading: 'Couldn\'t Create Comment',
          message: showCommentFailure + err.message,
          variant: 'danger'
        })
      })
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
    const { comment, deleted } = this.state

    if (!comment) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/comments' }
      } />
    }

    return (
      <>
        <h4>{comment.title}</h4>
        <p>Directed by: {comment.director}</p>
        <button onClick={this.destroy}>Delete comment</button>
        <Link to={`/comments/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/comments">Back to all comments</Link>
      </>
    )
  }
}

export default withRouter(EditComment)
