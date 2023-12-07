import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import  HandleApi  from "../utils/handleApi";
import {useFetching} from "../hooks/useFetching";

import SingleTodoComponent from "../components/SingleTodoComponent.js";
import MyButton from '../components/UI/button/MyButton.jsx'

export default function EditTodo() {
    const navigate = useNavigate();
    const location = useLocation()
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        isCompleted: false,
        tags: [],
    })


    const [fetchTodoById, isTodoLoading, error] = useFetching(async (id) => {
        const response = await HandleApi.getItemById(id)
        setTodo(response.data);
    })

    useEffect(()=>{
        fetchTodoById(location.state.id)
    },[])
    
    async function putData(){
        if(Object.keys(todo).length !== 0){
            const response = await HandleApi.updateItem(location.state.id, todo)
            if(response.status === 200){
                navigate('/')
            }
            console.log("PUTDATA")
            
        }
    }


    const [isValidated, setIsValidated] = useState(false)
    
    const setValidation = (valid) => {
        setIsValidated(valid)
    }

    useEffect(() =>{
        console.log("IS VALID " + isValidated)
    },[isValidated])

    useEffect(() => {
        setIsValidated(false)
    }, [])
    

    return (
        <div className="header">
            <h1>Edit Todo</h1>
            {isTodoLoading 
                ? <h1>Loading</h1>
                : <div className="todo-container">
                    <SingleTodoComponent todo={todo} setData={setTodo}  validation={setValidation}></SingleTodoComponent>
                    <div className="button-container">
                        <MyButton onClick={putData} disabled={!isValidated}>EDIT</MyButton>
                        <Link to='/'>
                        <MyButton>CANCEL</MyButton>
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
}