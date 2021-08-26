/* eslint-disable no-tabs */
import apiUrl from '../apiConfig'
import axios from 'axios'

export const createComment = (comment, user, postId) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/posts/${postId}/comments/`,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      comment: {
        ownerName: comment.ownerName,
        owner: comment.owner,
        content: comment.content,
        _id: comment._id
      }
    }
  })
}

export const updateComment = (comment, user, postId) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/posts/${postId}/comments/`,
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

export const deleteComment = (user, postId, commentId) => {
  return axios({
    method: 'DELETE',
    url: `/comments/${commentId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
