import React from 'react'

export default (props) => {

  const { messages } = props

  return (
    <div className='row'>
      <ul id='messages'>
          { messages.map((message, idx) => {
            return (
              <div key={idx}>
                <li className={`chat-border ${message.align}`}>
                  <strong>{ message.user }: </strong>
                  <span>{ message.text }</span>
                </li>
                <li className='clear'></li>
              </div>
            )
          })}
      </ul>
    </div>
  )
}
