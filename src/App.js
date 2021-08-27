/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
// Import React, also destructuring Component and Fragment from React
// React is required for JSX
import React, { Component } from 'react'
// Destructuring Route component from react-router-dom
import { Route, withRouter } from 'react-router-dom'
// import v4 and rename it uuid
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import CreatePost from './components/posts/CreatePost/CreatePost'
import EditPost from './components/posts/EditPost/EditPost'
import Home from './components/Home/Home'
import Post from './components/posts/Post'
import Profile from './components/Profile/Profile'

class App extends Component {
  // Constructor initializes component
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

	// Accepts a user and sets that user in state
	setUser = (user) => this.setState({ user })

	// Clears current user and sets user in state to null
	clearUser = () => this.setState({ user: null })

	// Removes a specific alert from the msgAlerts array in state
	deleteAlert = (id) => {
	  this.setState((state) => {
	    // .filter() does not modify original array
	    return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
	  })
	}

	// Accepts one alert object with three keys
	msgAlert = ({ heading, message, variant }) => {
	  // Generate a universally unique id for this alert
	  const id = uuid()
	  // Set state by passing setState a callback
	  // 'state' param is previous state
	  this.setState((state) => {
	    return {
	      // spread existing msgAlerts array and add the new alert to it.
	      msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
	    }
	  })
	}

	componentDidMount () {
	  const { history } = this.props
	  const user = JSON.parse(window.localStorage.getItem('user'))
	  if (window) {
	    this.setUser(user)
	    history.push('/home')
	  }
	}

	render () {
	  const { msgAlerts, user } = this.state

	  return (
	    <>
	      {/* Passing user to header allows for tabs unique to the user */}
	      <Header user={user} />
	      {/* This .map will return a new array filled with JSX of our msgAlerts */}
	      {msgAlerts.map((msgAlert) => (
	        <AutoDismissAlert
	          key={msgAlert.id}
	          heading={msgAlert.heading}
	          variant={msgAlert.variant}
	          message={msgAlert.message}
	          id={msgAlert.id}
	          deleteAlert={this.deleteAlert}
	        />
	      ))}
	      <main className='container col-sm-12 col-lg-6'>
	        {/* Pass in 'msgAlert' and 'setUser' methods as props */}
	        <Route
	          path='/sign-up'
	          render={() => (
	            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
	          )}
	        />
	        <Route
	          path='/sign-in'
	          render={() => (
	            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
	          )}
	        />
	        <AuthenticatedRoute
	          user={user}
	          path='/sign-out'
	          render={() => (
	            <SignOut
	              msgAlert={this.msgAlert}
	              clearUser={this.clearUser}
	              user={user}
	            />
	          )}
	        />
	        <AuthenticatedRoute
	          user={user}
	          path='/change-password'
	          render={() => (
	            <ChangePassword msgAlert={this.msgAlert} user={user} />
	          )}
	        />
	        <AuthenticatedRoute
	          user={user}
	          path='/create-post'
	          render={() => <CreatePost msgAlert={this.msgAlert} user={user} />}
	        />
	        <AuthenticatedRoute
	          user={user}
					  exact
	          path='/posts/:id/edit'
	          render={() => <EditPost msgAlert={this.msgAlert} user={user} />}
	        />
	        <AuthenticatedRoute
	          user={user}
	          exact
	          path='/home'
	          render={() => <Home msgAlert={this.msgAlert} user={user} />}
	        />
	        <AuthenticatedRoute
	          user={user}
	          exact
	          path='/posts/:id'
	          render={() => <Post msgAlert={this.msgAlert} user={user} />}
	        />
	        <AuthenticatedRoute
	          user={user}
	          exact
	          path='/posts'
	          render={() => <Profile msgAlert={this.msgAlert} user={user} />}
	        />
	      </main>
	    </>
	  )
	}
}

export default withRouter(App)
