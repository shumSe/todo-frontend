import React from 'react'

const TagsComponent = ({text}) => {
  return (
    <div className="tag__container">
        <div className="tag__text">{'#'+text}</div>
    </div>
  )
}

export default TagsComponent