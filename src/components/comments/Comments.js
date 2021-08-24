import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { indexComments } from '../../api/comments'
import { indexCommentsFailure } from '../AutoDismissAlert/messages'

class Comments extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comments: [],
      loading: false
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexComments(user)
      .then(res => this.setState({
        comments: res.data.comments
      }))
      .catch(err => {
        msgAlert({
          heading: 'Couldn\'t Create Comment',
          message: indexCommentsFailure + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { comments } = this.state
    return (
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <Link to={`/comments/${comment._id}`}>{comment.title}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

export default Comments
