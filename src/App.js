import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  //Weather API
  const apiKey = '362f8e41642ed0cd7d5390ef59e4bc89'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")
  const getWeather = (e) => {
    if (e.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
      .then(response => response.json())
      .then(
        data => {
          setWeatherData(data); setCity("")}
        ).catch((error) => {
          console.log(error);
        })
    }
  }

  //Random Users API
  const [userData, setUserData] = useState([{}])

  const getUser = () => {
    fetch(`https://randomuser.me/api/`)
    .then(response => response.json())
    .then(data => {setUserData(data.results)})
  }

  // const getUsers = (e) => {
  //   fetch(`https://randomuser.me/api/`)
  //   .then((response => response.json())
  //   .then((response => {
  //     this.setState({
  //       items: response.results,
  //       loading: true
  //     })
  //   }))
  //   )
  // }

  const pictures = [
    {
      id: uuidv4(),
      title: "jan",
      img: '/images/jan-brennenstuh.jpg'
    },
    {
      id: uuidv4(),
      title: "denys",
      img: "/images/denys-nevozhai.jpg"
    },
    {
      id: uuidv4(),
      title: "claudio",
      img: "/images/claudio-buttler.jpg"
    },
    {
      id: uuidv4(),
      title: "vincent",
      img: "/images/vincent-ledvina.jpg"
    },
    {
      id: uuidv4(),
      title: "sam",
      img: "/images/sam-carter.jpg"
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
      <div 
        className="frame" 
        style={{
        width: '50%',
        border: '3px solid #ccc', 
        background: '#eee', 
        margin: 'auto', 
        padding: '15px 10px'
      }}>
      <img onClick={changePicture} src={pictures[imageIndex].img} alt={pictures[imageIndex].img} 
        style={{
        width: '100%',
        height: 'auto',
        cursor: 'pointer'
        }}
      />
      <h4 style={{textAlign: 'center'}}>Change image on Click</h4>
      </div>
      <br></br>
      <br></br>
      <input 
        placeholder="Enter City..."
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />
      
      {typeof weatherData.main === 'undefined' ? (
        <>
          <p>Weather API: enter city name do display data</p>
        </>
      ) : (
        <>
          <p>{weatherData.name}</p>
          <p>{Math.round(weatherData.main.temp)}ºC</p>
          <p>{weatherData.weather[0].main}</p>
          <p></p>
        </>
      )}

      {weatherData.cod === "404" ? (
        <p>City not found.</p>
      ) : (
        <>
        </>
      )}
      <br></br>
      <br></br>
      <button 
        className="btn btn-primary"
        onClick={getUser}>Get User
      </button>
      <p>Name: <br></br>{JSON.stringify(userData[0].name?.first)}</p>
      <p>email: <br></br>{JSON.stringify(userData[0].email)}</p>
      <p>Picture: <br></br>{JSON.stringify(userData[0].picture?.large)}</p>
      <img imgurl={JSON.stringify(userData[0].picture?.large)} alt="alt" />
    </>
  )
}

export default App;
