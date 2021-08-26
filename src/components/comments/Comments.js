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

  // componentDidMount () {
  //   const { user, msgAlert } = this.props

  //   indexComments(user)
  //     .then(res => this.setState({
  //       comments: res.data.comments
  //     }))
  //     .catch(err => {
  //       msgAlert({
  //         heading: 'Couldn\'t Create Comment',
  //         message: indexCommentsFailure + err.message,
  //         variant: 'danger'
  //       })
  //     })
  // }

  render () {
    const { comments, msgAlert, user } = this.props
    return (
      <div>
        {comments.map(comment => (
          <div key={comment._id}>
            <Comment
              msgAlert={msgAlert}
              user={user}
              comment={comment}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default Comments
