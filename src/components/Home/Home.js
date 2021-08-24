import React, { Component } from 'react'

import CreatePost from '../posts/CreatePost'
import Posts from '../posts/Posts'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: [],
      loading: false
    }
  }

  render () {
    return (
      <>
        <CreatePost />
        <Posts />
      </>
    )
  }
}

export default Home
