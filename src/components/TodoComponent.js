import React from 'react'
import {useState} from 'react'
import TagsComponent from "./TagsComponent";
import {useNavigate } from 'react-router-dom'
import MyCheckbox from './UI/checkbox/MyCheckbox';
import { Icon } from '@iconify/react';

const TodoComponent = ({item, remove, complete, addSelectedItem, removeSelectedItem}) => {
  const navigate = useNavigate ()
  const deleteTodo = () => {
    remove(item)
  }

  const [isSelected, setIsSelected] = useState(false)

  const completeTodo = () => {
    item.isCompleted = !item.isCompleted
    complete(item)
  }

  const handleChange = () => {

    setIsSelected(!isSelected)

    if(!isSelected){
      addSelectedItem(item.id)
    }else{
      removeSelectedItem(item.id)
    }
  }

  return (
    <div className="todo">
        <div className='left__container'>
          <MyCheckbox value={isSelected || false} onChange={handleChange}></MyCheckbox>
          <div className="todo__container">
              {item.isCompleted
                ? <div className="todo__text" style={{color: "#FFFFFF66", textDecoration:'line-through'}}>{item.title}</div>
                : <div className="todo__text">{item.title}</div>
              }
            <div className="todo__tagsList">
            {item.tags.map((tag) => <TagsComponent key={tag.id} text={tag.tagTitle}/>)}
            </div>
          </div>
        </div>
        <div className='todo__buttons'>
          {item.isCompleted
            ? <Icon icon="line-md:cancel" width="21" height='21' color="#F00" onClick={completeTodo} className='icon'/>
            : <Icon icon="fluent-mdl2:completed" width="20" height="20" color="#0F0" onClick={completeTodo} className='icon'/>
          }
          <Icon icon="clarity:edit-line" width="20" height="20" onClick={() => { navigate('/editTodo/', {state:{id: item.id}})}} className='icon'/>
          <Icon icon="fluent:delete-24-regular" width="20" height="20" color="#F00" onClick={deleteTodo} className='icon'/>
        </div>
        
    </div>
  )
}

export default TodoComponent