import React from 'react'
import { Avatar, Chip } from 'material-ui'
import { StepsChipRight } from '../material-style'

export default (props) => {

  const { messages } = props
  console.log(messages)

  return (
    <div>
        <ul id='messages'>
          { messages.map((message) => {
            return (
              <div key={ message.id }>
                <li className={ message.align }>
                  { message.align === 'right' ?
                    (<StepsChipRight>
                      <Avatar src={ message.user.img_URL } />
                      <span><strong>{ `${message.user.first_name}: ` }</strong></span>
                      <span>{ message.text }</span>
                    </StepsChipRight>) :
                    (<Chip>
                      <Avatar src={ message.user.img_URL } />
                      <span><strong>{ `${message.user.first_name}: ` }</strong></span>
                      <span>{ message.text }</span>
                    </Chip>)
                }
                </li>
                <li className='clear'></li>
              </div>
            )
          })}
        </ul>
    </div>
  )
}
