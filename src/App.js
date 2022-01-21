import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const pictures = [
    {
      id: uuidv4(),
      title: "jan",
      img: './images/jan-brennenstuh.jpg'
    },
    {
      id: uuidv4(),
      title: "denys",
      img: "./images/denys-nevozhai.jpg"
    },
    {
      id: uuidv4(),
      title: "claudio",
      img: "./images/claudio-buttler.jpg"
    },
    {
      id: uuidv4(),
      title: "vincent",
      img: "./images/vincent-ledvina.jpg"
    },
    {
      id: uuidv4(),
      title: "sam",
      img: "./images/sam-carter.jpg"
    }
  ]

  const [imageIndex, setImageIndex] = useState(() => {
    return 0
  });

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function changePicture() {
    if (imageIndex === pictures.length - 1)
      setImageIndex(imageIndex - (pictures.length - 1))
    else
      setImageIndex(imageIndex + 1)
  }

  return (
    <>
    
      <TodoList todos = {todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      <br></br>
      <br></br>
      <div className="frame" 
        style={{
          width: '50%',
          border: '3px solid #ccc', 
          background: '#eee', 
          margin: 'auto', 
          padding: '15px 10px'
        }}>
        <img onClick={changePicture} src={pictures[imageIndex].img} alt="Nature" 
          style={{
            width: '100%',
            height: 'auto',
            cursor: 'pointer'
          }}
        />
        <h4 style={{textAlign: 'center'}}>Change image on Click</h4>
        
      </div>
    </>
  )
}

export default App;
