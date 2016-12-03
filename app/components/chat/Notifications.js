import React from 'react'

export default (props) => {

  const { notifications } = props

  return (
    <div className='notifications'>
      <span>{ notifications }</span>
    </div>
  )
}
