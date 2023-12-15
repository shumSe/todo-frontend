import React, { useEffect } from "react";
import { useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import HandleApi from "../utils/handleApi";
import SingleTodoComponent from "../components/SingleTodoComponent.js";
import MyButton from '../components/UI/button/MyButton.jsx'

export default function AddTodo() {
    const navigate = useNavigate();

    const [todo, setTodo] = useState({
        title: '',
        description: '',
        isCompleted: false,
        tags: [],
    })

    const [isValidated, setIsValidated] = useState(false)

    const setValidation = (valid) => {
        setIsValidated(valid)
    }

    async function postData(){
        if(Object.keys(todo).length !== 0){
            const response = await HandleApi.addItem(todo)
            if(response.status === 200){
                navigate('/')
            }
        }
    }

    useEffect(() => {
        setIsValidated(false)
    }, [])

    return (
        <div className="todo-container">
            <h1>Add New Todo</h1>
            <SingleTodoComponent todo={todo} setData={setTodo} validation={setValidation}></SingleTodoComponent>
            <div className="button-container">
                    <MyButton onClick={postData} disabled={!isValidated}>ADD</MyButton>
                    <Link to='/'>
                        <MyButton>CANCEL</MyButton>
                    </Link>
            </div>
        </div>
    );
    
}