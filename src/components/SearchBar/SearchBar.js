import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import apiUrl from '../../apiConfig'
import { search } from '../../api/search'

import './SearchBar.scss'

class SearchBar extends Component {
  state = {
    users: null,
    loading: false,
    value: ''
  };

  search = async val => {
    this.setState({ loading: true })
    const results = await search(
      `${apiUrl}/users?users=${val}`
    )
    console.log(results)
    const users = results

    this.setState({ users, loading: false })
  }

  onChangeHandler = async e => {
    this.search(e.target.value)
    this.setState({ value: e.target.value })
  }

  get renderUsers () {
    let users = ''
    if (this.state.users) {
      console.log('it worked')
      users = this.state.users.map(user => {
        return (
          <div className='result' key={user._id}>
            <Link to={`/posts?user=${user._id}`} >{user.username}</Link>
          </div>
        )
      })
    }
    if (!this.state.value) {
      users = ''
    }

    return users
  }

  render () {
    const { value } = this.state
    const noResults = this.renderUsers.length === 0 && value.length > 0
    const noResultsJsx = (<div className="result">No results</div>)
    return (
      <>
        <div className="searchBar">
          <input className="searchInput"
            value={value}
            onChange={e => this.onChangeHandler(e)}
            placeholder="Search Users"
          />
        </div>
        <div className="resultContainer">
          {noResults ? noResultsJsx : this.renderUsers}
        </div>
      </>
    )
  }
}

export default SearchBar
