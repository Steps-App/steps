import React from 'react'

export default (props) => {

  const { messages } = props

  return (
    <div className='row'>
      <ul id='messages'>
          { messages.map((message, idx) => {
            return (
              <li key={ idx } className={`chat-border ${message.align}`}>
                <strong>{ message.user }: </strong>
                <span>{ message.text }</span>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
