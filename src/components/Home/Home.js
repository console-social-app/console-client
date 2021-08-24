import React, { Component } from 'react'

import CreatePost from '../posts/CreatePost'
import Posts from '../posts/Posts'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    return (
      <>
        <h1>hello</h1>
        <CreatePost />
        <Posts />
      </>
    )
  }
}

export default Home
