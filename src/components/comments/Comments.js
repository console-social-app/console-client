import React, { Component } from 'react'
import Comment from './Comment'

class Comments extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comments: [],
      loading: false
    }
  }

  render () {
    const { comments, msgAlert, user, postId, updateComments } = this.props
    return (
      <div>
        {comments.map((comment) => (
          <div key={comment._id}>
            <Comment
              updateComments={updateComments}
              msgAlert={msgAlert}
              comment={comment}
              postId={postId}
              user={user}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default Comments
