import React from 'react'
import { StepsRaisedButton } from '../material-style'

export default (props) => {

  const { onMessageSent, onMessageChange, message } = props

  return (
    <div className='row' id='messenger'>
      <form onSubmit={ onMessageSent }>
        <input value={ message } onChange={ onMessageChange }/>
        <StepsRaisedButton
          label='Send'
          style={{ width: '20%' }}
          type='submit'
        />
      </form>
    </div>
  )
}
