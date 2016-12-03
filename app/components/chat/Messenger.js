import React from 'react'
import { FloatingActionButton } from 'material-ui'
import { StepsRaisedButton } from '../material-style'
import Send from 'material-ui/svg-icons/content/send'

export default (props) => {

  const { onMessageSent, onMessageChange, message } = props

  return (
    <div id='messenger'>
      <form onSubmit={ onMessageSent }>
        <input value={ message } onChange={ onMessageChange }/>
        <FloatingActionButton
          backgroundColor="green"
          mini={ true }
          style={{ margin: '5px'}}
          type="submit"
          >
          <Send />
        </FloatingActionButton>
      </form>
    </div>
  )
}
