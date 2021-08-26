import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import CreateComment from '../../comments/CreateComment'
import Comments from '../../comments/Comments'

import Button from 'react-bootstrap/Button'

import './PostContainer.scss'

class PostContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comments: [],
      showComments: false
    }
  }

  goToPost = (e) => {
    if (!e.target.classList.contains('post')) return
    const { post, history } = this.props
    history.push(`/posts/${post._id}`)
  }

  updateComments = (comment) => {
    const { comments } = this.state
    const newComments = [...comments]
    if (typeof comment === 'string') {
      console.log('test', comment)
      // find the index of the comment to delete
      const index = comments.findIndex(el => el._id === comment)
      // if it finds the comment it will remove it form the comments array
      newComments.splice(index, 1)
      // update comments array via state
      this.setState({ comments: newComments })
    } else {
      const index = comments.findIndex(el => el._id === comment._id)
      if (index >= 0) {
        newComments.splice(index, 1, comment)

        this.setState({ comments: newComments })
      } else {
        this.setState(prevState => {
          return { comments: [comment, ...prevState.comments] }
        })
      }
    }
  }

  // new function to delete a comment

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
      <>
        <CreateComment
          updateComments={this.updateComments}
          msgAlert={msgAlert}
          user={user}
          postId={post._id}
        />
        <Comments
          updateComments={this.updateComments}
          msgAlert={msgAlert}
          user={user}
          comments={comments}
          postId={post._id}
          postOwner={post.owner._id}
        />
      </>
    )
    return (
      <div className="post postContainer" onClick={e => this.goToPost(e)}>
        <Link className="postOwner">{post.owner.username}</Link>
        <p className="post postTitle">{post.title}</p>
        <div className="post postContent">
          {post.content.split('\n').map((line, index) => {
            return (
              <p style={{ margin: 0 }} key={index}>
                {line.replace(' ', '\u00A0')}
              </p>
            )
          })}
        </div>
        <Button className="commentButton"size='sm' variant='outline-primary' onClick={this.toggleComments}>
          {showComments ? 'Hide Comments' : `Comments: ${comments.length}`}
        </Button>
        {showComments ? commentsJsx : ''}
      </div>
    )
  }
}

export default withRouter(PostContainer)
