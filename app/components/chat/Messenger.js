import React from 'react'
import { FloatingActionButton } from 'material-ui'
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
          type="submit" >
          <Send style={{ backgroundColor: 'none' }}/>
        </FloatingActionButton>
      </form>
    </div>
  )
}
