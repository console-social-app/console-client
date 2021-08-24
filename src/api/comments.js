/* eslint-disable no-tabs */
import apiUrl from '../apiConfig'
import axios from 'axios'

export const createComment = (comment, user, postId) => {
  return axios({
    method: 'POST',
    url: apiUrl + `post/${postId}/comments/`,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      comment: {
        owner: comment.owner,
        content: comment.content
      }
    }
  })
}

export const indexComments = (user, postId) => {
  return axios({
    method: 'GET',
    url: apiUrl + `post/${postId}/comments/`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showComment = (user, postId, commentId) => {
  return axios({
    method: 'GET',
    url: `post/${postId}/comments/${commentId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deleteComment = (user, postId, commentId) => {
  return axios({
    method: 'DELETE',
    url: `post/${postId}/comments/${commentId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
