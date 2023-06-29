import { useState } from 'react'

function ToDoForm({ addTask, boardId }) {
    const [userInput, setUserInput] = useState('')

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        addTask(userInput, boardId)
        setUserInput("")
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            handleSubmit(e)
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                className='input-add' 
                value={userInput}
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Введите задачу..."
            />        
            <button className='btn-add'>Сохранить</button>
        </form>
    )
}

export default ToDoForm