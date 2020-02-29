import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE='todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
    if(storedTodos) setTodos(storedTodos)
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo() {
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: true}]
    })
    todoNameRef.current.value = null
  }

  return (
    <>
      <TodoList todos={todos} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button>Clear Completed</button>
      <div>0 left to do</div>
    </>
  )
}

export default App;
