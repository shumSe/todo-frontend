import React from "react";
import { useEffect, useState } from "react";
import HandleApi from "../utils/handleApi";
import TodoComponent from "../components/TodoComponent";
import { Link } from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";
import { useFetching } from "../hooks/useFetching";

export default function Home()  {
    const [todoList, setTodoList] = useState([])
    const [isListEmpty, setIsListEmpty] = useState([true])

    const [fetchTodoList, isTodoListLoading, todoError] = useFetching(async () => {
        const response = await HandleApi.getAllItems();
        setTodoList([...todoList, ...response.data])
    })

    useEffect(() => {
        fetchTodoList()
    }, [])

    useEffect(() => {
        if(todoList.length > 0){
            setIsListEmpty(false)
        }else{
            setIsListEmpty(true)
        }
    },[todoList])

    const removeTodo = async (item) => {
        setTodoList(todoList.filter(p => p.id !== item.id))
        const response = await HandleApi.deleteItem(item.id)
    }

    const [selectedTodos, setSelectedTodos] = useState([])

    const addSelectedItem = (item) => {
        setSelectedTodos([...selectedTodos, item])
    }  

    const removeFromSelected = (item) => {
        setSelectedTodos(selectedTodos.filter((i => i !== item)))
    }

    const completeTodo = async (item) => {
        setTodoList(
            todoList.map((t) => {
                if(t.id === item.id){
                    return {...t, isCompleted: item.isCompleted}
                } else {
                    return t
                }
            }
            )
        )
        const response = await HandleApi.updateItem(item.id, item)
    }

    const deleteSelected = async (event) => {
        event.preventDefault()
        setTodoList(
            todoList.filter(p => !selectedTodos.includes(p.id))
        )

        const response = await HandleApi.deleteItemList(selectedTodos)
        if(response.status === 200){
            setSelectedTodos([])
        }
    }

    return (
        <div className="container">
    
            <h1>Todo App</h1>

                <div className="top">

                    <form>
                        <Link to="/addTodo">
                            <MyButton>
                                ADD
                            </MyButton>
                        </Link>
                    </form>

                    <form>
                        <MyButton onClick={deleteSelected}>
                        DELETE
                        </MyButton>
                    </form>

                </div>

                <div>

                    {isTodoListLoading
                        ? <h1>Loading</h1>
                        : <div>
                            {!isListEmpty
                                ? <div className="list">{todoList.map((item) => <TodoComponent 
                                    key={item.id} 
                                    item={item} 
                                    remove={removeTodo} 
                                    complete={completeTodo}
                                    addSelectedItem={addSelectedItem} 
                                    removeSelectedItem={removeFromSelected}
                                    />)} </div>
                                : <h1>Нет дел</h1>
                            }
                            
                           </div>
                        }
                </div>

        </div>
        );
    
}