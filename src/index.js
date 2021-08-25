import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
const baseURL = process.env.PUBLIC_URL
const socket = socketIOClient(baseURL)

socket.on('social', (message) => console.log(message))

const appJsx = (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
