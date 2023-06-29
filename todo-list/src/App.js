import { useState, useEffect } from 'react'
import ToDo from './ToDo'
import ToDoForm from './ToDoForm';
import './index.css';

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos'))||[])
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('boards'))||[])
  const [userInput, setUserInput] = useState('');

  useEffect(()=> {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(()=> {
    localStorage.setItem('boards', JSON.stringify(boards))
  }, [boards])

  const addTask = (userInput, boardId) => {
    if(userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2,9),
        task: userInput,
        boardId: boardId,
      }
      setTodos([...todos, newItem])
    }
  }

  const addBoard = (userInput) => {
    if(userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2,9),
        name: "Список задач",
      }
      setBoards([...boards, newItem])
    }
  }
  
  
  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  const removeBoard = (id) => {
    setBoards([...boards.filter((board) => board.id !== id)])
    setTodos([...todos.filter((todo) => todo.boardId !== id)])
  }


  const saveTask = (id, userInput) => {
    let newTodo = [...todos].map(todo=>{
      if(todo.id==id){
        todo.task = userInput
      }
      return todo
  })
  setTodos(newTodo)
  }
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value)
}

  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) => 
        todo.id === id ? { ...todo, complete: !todo.complete } : {...todo }
      )
    ])
  }


  return (
    <div className='boards'>
      {boards.map((board)=>{
        return(
          <div className="App">
            <div className='remove-board' onClick={() => removeBoard(board.id)}>X</div>
            <div className='title'>
              <h1>
                {board.name}
              </h1>
            </div>
          <ToDoForm 
            addTask={addTask} 
            boardId={board.id} 
            key={board.id} />
          {
          todos.filter(task=> task.boardId ==board.id).map(todo => {
            return(
              <ToDo
                todo={todo}
                key={todo.id}
                toggleTask={handleToggle}
                removeTask={removeTask}
                saveTask={saveTask}
              />    
          )})
    }

    </div>
        )
      })}
    <div className='add-board'>
      <button className='btn-add-board' onClick={addBoard}>Новый список</button>
    </div>
    </div>
    
  );
}

export default App;