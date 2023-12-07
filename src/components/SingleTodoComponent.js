import React from 'react'
import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';

import MyInput from '../components/UI/input/MyInput.jsx'
import MyCheckbox from '../components/UI/checkbox/MyCheckbox.jsx'

import EditTagsComponent from "./EditTagsComponent";
import MyTagInput from './UI/tagInput/MyTagInput.jsx';

const SingleTodoComponent = ({todo, setData, validation}) => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isValid, setIsValid] = useState(false)

    const handleChange = (e) => {
        setData({
          ...todo,
          [e.target.name] : e.target.value
        })
    }

    const handleCheckbox = () => {
      console.log("CKECBOX")
      setData({
        ...todo,
        isCompleted: !todo.isCompleted
      })
    }

    useEffect(() => {
      if(Object.keys(todo).length > 0){
        setIsValid(todo.title.trim().length > 0)
      }
    }, [todo.title])

    useEffect(() => {
      validation(isValid)
    }, [isValid])

    const setInputVisible = () => {
      setIsModalVisible(true)
    }

    const addTag = (tagName) => {
      if(tagName.length > 0){
        const newTag = {
          tagTitle: tagName
        }
        if(todo.tags){
          if(todo.tags.filter(p => p.tagTitle === tagName).length === 0){
            setData({
              ...todo,
              tags: [...todo.tags, newTag]
          })}
        }else{
          setData({
            ...todo,
            tags: [newTag]
        })
      }
      }
      setIsModalVisible(false)
    }

    const removeTag = (tag) => {
      setData({
        ...todo,
        tags: todo.tags.filter(p => p.tagTitle !== tag.tagTitle)
      })
    }

  return (
    <div>
            <div className="input-container">
                <MyInput 
                  placeholder="Title (required field)" 
                  defaultValue={todo.title || ''} 
                  name="title"
                  onChange={handleChange}
                  required
                  ></MyInput>
                <textarea 
                  className="description-input"
                  placeholder="Description" 
                  name="description"
                  defaultValue={todo.description || ''}
                  onChange={handleChange}
                  ></textarea >
                <div>
                  <span>Is Completed</span>
                  <MyCheckbox value={todo.isCompleted || false} onChange={handleCheckbox} label=''/>
                </div>
                <div className='tags__container'>
                  {todo.tags.length > 0
                    ? <div className="tags__list"> 
                    {todo.tags.map((tag) => <EditTagsComponent key={tag.tagTitle} text={tag.tagTitle} item={tag} remove={removeTag}/>)}
                    </div>
                    :<div/>
                  }
                  {isModalVisible
                      ? <MyTagInput getTagName={addTag}></MyTagInput>
                      : <div style={{display: "flex"}}>
                        {todo.tags.length > 0
                        ? <div/>
                        : <span style={{marginRight : "3px"}}>Добавить тег</span>
                        }
                        <Icon icon="gg:add" color="#0d0" width="22" className="tag__add__btn" onClick={setInputVisible}/>
                    </div>
                  }
                </div>
            </div>
    </div>
  )
}

export default SingleTodoComponent;
