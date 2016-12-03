import React from 'react'
import { Avatar, Chip } from 'material-ui'

export default (props) => {

  const { messages } = props

  return (
    <div>
        <ul id='messages'>
        { messages.map((message, idx) => (
            <div key={idx} className="message">
              <li className={ message.align }>
                <Chip style={ message.align === 'right' ? { textAlign: 'right', display: 'block', float: 'right' } : {} }>
                  <Avatar src={ message.user.img_URL } />
                  <span><strong>{ `${message.user.first_name}: ` }</strong></span>
                  <span>{ message.text }</span>
                </Chip>
              </li>
              <li className='clear'></li>
            </div>
        ))}
        </ul>
    </div>
  )
}
