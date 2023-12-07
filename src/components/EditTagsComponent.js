import React from 'react'
import { Icon } from '@iconify/react';

const EditTagsComponent = ({text, item, remove}) => {

  const removeTag = () => {
    console.log("remove")
    remove(item)
  }

  return (
    <div className='edit__tag__container'>
        <div className='edit__tag__text'>{`#${text}`}</div>
        <div className='edit__tag__remove__btn' onClick={removeTag}>
          <Icon icon="clarity:remove-line" width="18" color="#C00"/>
        </div>
    </div>
  )
}

export default EditTagsComponent