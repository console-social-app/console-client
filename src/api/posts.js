/* eslint-disable no-tabs */
import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPost = (post, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/posts/',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      post: {
        owner: post.owner,
        title: post.title,
        content: post.content
      }
    }
  })
}

export const indexPosts = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts/',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showPost = (user, postId) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/posts/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deletePost = (user, postId) => {
  return axios({
    method: 'DELETE',
    url: `${apiUrl}/posts/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
