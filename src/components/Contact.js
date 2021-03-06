import React, { Component } from 'react'
import NewsletterForm from './NewsletterForm'

export default class Contact extends Component {
  render() {
    return (
      <>
        <h1>Stay in Touch</h1>
        <p>
          I write about my journies in software development. JavaScript, backend development, and much more. Get updates infrequently.
        </p>
        <NewsletterForm />
        <p>My username is "vincentntang" across the web.</p>
        <ul>
          <li>
            <strong>Email</strong>:{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/vincentntang">
              vincentntang@gmail.com
            </a>
          </li>
          <li>
            <strong>GitHub</strong>:{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/vincentntang">
              vincentntang
            </a>
          </li>
          <li>
            <strong>Twitter</strong>:{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/vincentntang">
              vincentntang
            </a>
          </li>
          <li>
            <strong>Linkedin</strong>:{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/vincentntang">
              vincentntang
            </a>
          </li>
        </ul>
      </>
    )
  }
}
